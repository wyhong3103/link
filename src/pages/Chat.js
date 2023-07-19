import { Nav } from "../components/Nav"
import { 
    VStack,
    Spinner,
    Flex,
    Heading,
    Image,
    Text,
    Button
} from "@chakra-ui/react"
import useAuth from "../hooks/useAuth"
import { useNavigate } from "react-router"
import { useErrorBoundary } from "react-error-boundary"
import { useState, useEffect } from "react"


export const Chat = () => {
    const navigate = useNavigate();
    const [ self ] = useAuth();
    const { showBoundary } = useErrorBoundary();
    const [loading, setLoading] = useState(true);
    const [chats, setChats] = useState([]);
    const api_url = process.env.REACT_APP_API_URL;
    const anonymousImage = `${api_url}/images/anonymous.jpg`;

    const fetchChats = async () => {
        const res = await fetch(
            api_url + '/chat',
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
        console.log(data.chats);

        setChats([...data.chats]);
    }

    useEffect(
        () => {
            (async () => {
                if (self){
                    await fetchChats();
                    setLoading(false);
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

        <VStack minH='100vh' bg='palette.4'>
            <Nav id={self.userid} last_name={self.last_name}/>
            <VStack bg='palette.3' p='15px' borderRadius='10px' gap='15px' w='400px' margin='20px'> 
                <Heading color='palette.1' fontSize='25px'>
                    Chat
                </Heading>
                {
                    chats.length > 0 ?
                    chats.map(
                        i => 
                        <Button bg='palette.4'
                            css={{
                                '&:hover': {
                                    backgroundColor: '#494F59',
                                },
                                '&:active': {
                                    backgroundColor: '#494F59',
                                },
                            }}
                            w='100%'
                            p='10px'
                            h='60px'
                            onClick={() => navigate('/chat/' + i.user._id)}
                        >
                            <Flex direction='row' justify='start' align='center' w='100%'  borderRadius='10px' gap='20px'
                            >
                                <Image src={(i.user.image && api_url + i.user.image) || anonymousImage} alt='avatar' h='40px' w='40px' objectFit='cover' borderRadius='100%'/>
                                <Text color='palette.1' fontSize='17px'>
                                    {`${i.user.first_name} ${i.user.last_name}`}
                                </Text>
                            </Flex>
                        </Button>
                    )

                    :

                    <Text color='palette.1'>
                        Let's break the ice! Start a chat now!
                    </Text>
                }
            </VStack>
        </VStack>
    )
}