import { Editor } from "../components/Editor"
import { VStack, Flex, Box, Spinner, Text } from "@chakra-ui/react"
import { Nav } from "../components/Nav"
import { Post } from "../components/Post"
import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"

export const Home = () => {
    const [user] = useAuth()
    const [loading, setLoading] = useState({});
    const [blogs, setBlogs] = useState([]);
    const api_url = process.env.REACT_APP_API_URL;

    useEffect(
        () => {
            (async () => {
                if (user){
                    const res = await fetch(
                        api_url + '/post',
                        {
                            credentials : 'include'
                        }
                    );

                    const data = await res.json();

                    setBlogs([...data.posts]);
                    setLoading(false);
                }
            })()
        }
    , [user])


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
        <VStack bg='palette.4' minH='100vh'>
            <Nav last_name={user.last_name} id={user.userid}/>
            <Flex p={{base : '5px', md : '20px'}} w='100%'>
                <VStack w='100%' gap='30px'>
                    <Box w={{base : '400px', md :'700px'}} bg='palette.3' p='10px' borderRadius='10px'>
                        <Editor placeholder="Write a post."/>
                    </Box>
                    {
                        blogs.length > 0 ?
                        blogs.map(
                            i => 
                            <Post post={i}/>
                        )
                        :
                        <Text color='palette.1'>
                            No posts! Make friends to see their posts here.
                        </Text>
                    }
                </VStack>
            </Flex>
        </VStack>
    )
}