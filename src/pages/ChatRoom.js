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
                    console.log(self);
                    await fetchMessages();
                    setLoading(false);
                    if (lastElementRef.current) lastElementRef.current.scrollIntoView({ behavior: 'smooth' });
                }
            })()
        }
    , [self])


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
                <VStack w={{base : '400px', md :'700px'}} gap='10px' bg='palette.3' p='5px' borderBottomRadius='10px'>
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
                    <Editor placeholder='Write a message.'/>
                </VStack>
            </VStack>
        </VStack>
    )
}