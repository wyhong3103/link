import { v4 as uuidv4 } from 'uuid';
import { SideBar } from "../components/Profile/SideBar"
import { Post } from "../components/Post"
import { Nav } from "../components/Nav"
import { 
    Flex, 
    VStack,
    Spinner, 
    Text,
    Center
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useErrorBoundary } from "react-error-boundary"
import { useParams } from "react-router-dom"
import useAuth from "../hooks/useAuth"

export const Profile = () => {
    const { id } = useParams();
    const [ self ] = useAuth();
    const { showBoundary } = useErrorBoundary();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({
        _id : '',
        first_name : '',
        last_name : '',
        friends : [],
        posts : [],

    });
    const api_url = process.env.REACT_APP_API_URL;

    const fetchInfo = async () => {
        const res = await fetch(
            api_url + `/user/${id}`,
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
        data.user.posts = [...(data.user.posts.reverse())]

        setUser({...data.user});
    }

    useEffect(
        () => {
            (async () => {
                if (self){
                    await fetchInfo();
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
            <Nav last_name={self.last_name} id={self.userid}/>
            <Flex direction={{base : 'column', lg : 'row'}} justify='space-around' gap={{base : '20px', lg : '0px' }} w='100%' p={{base : '5px', md : '20px'}} align={{base : 'center', lg : 'start'}}>
                <SideBar 
                    user={user}
                    selfid={self.userid}
                    fetchInfo={fetchInfo}
                />
                {
                
                user.posts.length > 0 ?

                <VStack gap='30px'>
                    {
                        user.posts.map(
                            i => 
                            <Post post={i} userid={self.userid} fetchPosts={fetchInfo} key={uuidv4()}/>
                        )
                    }
                </VStack> 

                :

                <Center w='700px' minH='200px'>
                    <Text color='palette.1'>
                        {user.last_name} has no post yet.
                    </Text>
                </Center>

                }
            </Flex>
        </VStack>
    )
}