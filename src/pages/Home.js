import { Editor } from "../components/Editor"
import { Nav } from "../components/Nav"
import { Post } from "../components/Post"
import { 
    VStack, 
    Flex, 
    Box, 
    Spinner, 
    Text 
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useErrorBoundary } from "react-error-boundary";
import useAuth from "../hooks/useAuth"

export const Home = () => {
    const [ self ] = useAuth()
    const { showBoundary } = useErrorBoundary();
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const api_url = process.env.REACT_APP_API_URL;

    const fetchPosts = async () => {
        const res = await fetch(
            api_url + '/post',
            {
                credentials : 'include'
            }
        );

        const data = await res.json();

        if (!res.ok){
            const error = new Error(data.error.result);
            error.status = res.status;
            showBoundary(error);
            return;
        }

        setBlogs([...(data.posts.reverse())]);
    }

    const submit = async (clear, setError, formData) => {
        const res = await fetch(
            api_url + '/post',
            {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                credentials : 'include',
                body: JSON.stringify(formData)
            }
        );
        
        const data = await res.json();

        if (res.ok){
            fetchPosts();
            clear();
        } else if (res.status <= 402){
            setError(data.error.content);
        } else {
            const error = new Error(data.error.result);
            error.status = res.status;
            showBoundary(error) ;
        }
    }


    useEffect(
        () => {
            (async () => {
                if (self){
                    await fetchPosts();
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

        <VStack bg='palette.4' minH='100vh'>
            <Nav last_name={self.last_name} id={self.userid}/>
            <Flex p={{base : '5px', md : '20px'}} w='100%'>
                <VStack w='100%' gap='30px'>
                    <Box w={{base : '400px', md :'700px'}} bg='palette.3' p='10px' borderRadius='10px'>
                        <Editor placeholder="Write a post." cb={submit}/>
                    </Box>
                    {
                        blogs.length > 0 ?
                        blogs.map(
                            i => 
                            <Post post={i} userid={self.userid} fetchPosts={fetchPosts}/>
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