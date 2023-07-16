import { Editor } from "../components/Editor"
import { VStack, Flex, Box } from "@chakra-ui/react"
import { Nav } from "../components/Nav"
import { Post } from "../components/Post"

export const Home = () => {
    return(
        <>
            <VStack bg='palette.4' minH='100vh'>
                <Nav/>
                <Flex p={{base : '5px', md : '20px'}} w='100%'>
                    <VStack w='100%' gap='30px'>
                        <Box minW={{base : '400px', md :'700px'}} bg='palette.3' p='10px' borderRadius='10px'>
                            <Editor/>
                        </Box>
                        <Post
                            post={
                                {
                                    author : {
                                        _id : 'test', 
                                        first_name : 'Barry', 
                                        last_name : 'Allen', 
                                        image : 'https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg'
                                    } ,
                                    content : "testing content", 
                                    markdown : true, 
                                    math : true,
                                    date : '15 July 2023', 
                                    image : '',
                                    comments : 
                                    [ 
                                        {
                                            _id : 'test', 
                                            content : "testing comment", 
                                            author : {
                                                _id : 'test', 
                                                first_name : "Barry", 
                                                last_name : "Allen", 
                                                image : 'https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg'
                                            } ,
                                            markdown : true,
                                            math : true,
                                            date : "15 July 2023"
                                        } 
                                    ],
                                    likes : [1, 2, 3, 4, 5],
                                }
                            }
                            
                        />
                    </VStack>
                </Flex>
            </VStack>
        </>
    )
}