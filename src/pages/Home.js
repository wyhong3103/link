import { Editor } from "../components/Editor"
import { VStack, Flex, Box } from "@chakra-ui/react"
import { Nav } from "../components/Nav"
import { Post } from "../components/Post"

export const Home = () => {
    return(
        <VStack bg='palette.4' minH='100vh'>
            <Nav/>
            <Flex p={{base : '5px', md : '20px'}} w='100%'>
                <VStack w='100%' gap='30px'>
                    <Box w={{base : '400px', md :'700px'}} bg='palette.3' p='10px' borderRadius='10px'>
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
                                content : "Pellentesque ut iaculis lectus. Maecenas scelerisque fringilla massa id dapibus. Proin ullamcorper risus in orci faucibus aliquam. Nam accumsan porttitor lorem, et dignissim augue venenatis sed. Sed suscipit purus nunc, at hendrerit sapien gravida id. Suspendisse at lorem mollis, cursus mauris quis, aliquet lectus. Suspendisse efficitur hendrerit purus, vel interdum velit tincidunt eu. Vivamus sit amet malesuada felis, ac fermentum nisi. Maecenas porttitor nunc in semper egestas. Mauris et sem lacinia, ultrices ligula nec, volutpat diam. Donec mollis tempor elit, a accumsan urna porta in. Pellentesque non odio ac mi pulvinar convallis ac ut nisl. Vivamus.", 
                                markdown : true, 
                                math : true,
                                date : '15 July 2023', 
                                image : '',
                                comments : 
                                [ 
                                    {
                                        _id : 'test', 
                                        content : "Pellentesque ut iaculis lectus. Maecenas scelerisque fringilla massa id dapibus. Proin ullamcorper risus in orci faucibus aliquam. Nam accumsan porttitor lorem, et dignissim augue venenatis sed. Sed suscipit purus nunc, at hendrerit sapien gravida id. Suspendisse at lorem mollis, cursus mauris quis, aliquet lectus. Suspendisse efficitur hendrerit purus, vel interdum velit tincidunt eu. Vivamus sit amet malesuada felis, ac fermentum nisi. Maecenas porttitor nunc in semper egestas. Mauris et sem lacinia, ultrices ligula nec, volutpat diam. Donec mollis tempor elit, a accumsan urna porta in. Pellentesque non odio ac mi pulvinar convallis ac ut nisl. Vivamus.", 
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
    )
}