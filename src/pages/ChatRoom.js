/* eslint-disable react-hooks/exhaustive-deps */
import { Editor } from "../components/Editor"
import { Bubble } from "../components/ChatRoom/Bubble"
import { Nav } from "../components/Nav"
import { 
    VStack,
    Spinner,
    Flex,
    Image,
    Text
} from "@chakra-ui/react"
import useAuth from "../hooks/useAuth"
import { useErrorBoundary } from "react-error-boundary"
import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { io } from 'socket.io-client'

const socket = io(process.env.REACT_APP_SOCKET_URL);


export const ChatRoom = () => {
    const { id } = useParams();
    const lastElementRef = useRef(null);
    const [ self ] = useAuth();
    const { showBoundary } = useErrorBoundary();
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    // const [user, setUser] = useState({author : {image : ''}, first_name : 'test', last_name : 'test'});
    const [user, setUser] = useState({});
    const api_url = process.env.REACT_APP_API_URL;
    const anonymousImage = `${api_url}/images/anonymous.jpg`;

    const pushMsg = (msg) => {
        if (!msg.content.trim().length || msg.content.length > 20000) return;
        const temp = messages;
        temp.push(msg);
        setMessages([...temp]);
    }

    const send = (clear, setError, formData) => {
        formData.author = {};
        formData.author._id = self.userid;
        if (!formData.content.trim().length || formData.content.length > 20000){
            setError('Message should be within 1 to 20000 characters.')
            return;
        }
        socket.emit('send', formData, [self.userid, id], self.userid);
        pushMsg(formData);
        clear();
    }

    const receive = (msg) => {
        msg.author.first_name = user.first_name;
        msg.author.last_name = user.last_name;
        pushMsg(msg);
    };

    const fetchMessages = async () => {
        const res = await fetch(
            api_url + `/chat/${self.userid},${id}`,
            {
                credentials : 'include'
            }
        );

        const data = await res.json();

        if (!res.ok){
            const error = new Error(data.error.result);
            error.status = res.status;
            error.isLogged = true;
            showBoundary(error);
            return;
        }

        setMessages([...data.messages]);
        setUser({...data.user});
    }


    useEffect(
        () => {
            (async () => {
                if (self){
                    await fetchMessages();
                    setLoading(false);
                    socket.emit('join', [self.userid, id]);
                }
            })()
        }
    , [self])

    useEffect(
        () => {
            socket.on('receive', receive);
            return () => {
                socket.off('receive', receive);
            };
        }
    ,[receive])

    useEffect(
        () => {
            if (lastElementRef.current) lastElementRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    ,[messages])


    return(
        loading ?

        <Flex bg='palette.4' minH='100vh' justify='center' align='center'>
            <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='palette.6'
            size='xl'
            />
        </Flex>

        :

        <VStack minH='100vh' bg='palette.4' gap='20px'>
            <Nav id={self.userid} last_name={self.last_name}/>
            <VStack gap='0'>
                <Flex direction='row' justify='start' align='center' w='100%' p='10px 20px' bg='palette.2' borderTopRadius='10px' gap='20px'>
                    <Image 
                    src={(user.image && api_url + user.image) || anonymousImage} 
                    w='40px' h='40px' 
                    objectFit='cover' 
                    borderRadius='100%'/>
                    <Text color='palette.1'>
                        {user.first_name} {user.last_name}
                    </Text>
                </Flex>
                <VStack w={{base : '400px', md :'700px'}} gap='10px' bg='palette.3' p='10px' borderBottomRadius='10px'>
                    <VStack w='100%' p='10px' h='300px' overflow='auto'>
                        {
                            messages.length > 0 ?

                            messages.map(
                                i =>
                                <Bubble selfid={self.userid} message={i}/>
                            )

                            :

                            <Text color='palette.1'>
                                No messages yet, be the first to chat!
                            </Text>
                        }
                        <div ref={lastElementRef}/> 
                    </VStack>
                    <Editor placeholder='Write a message.' cb={send}/>
                </VStack>
            </VStack>
        </VStack>
    )
}