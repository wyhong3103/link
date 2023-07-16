import { CommentEditor } from "./Post/CommentEditor"
import { Comment } from "./Post/Comment"
import { Content } from "./Content"
import { Flex, VStack, Image, Button, Text, Link } from "@chakra-ui/react"

export const Post = ({post}) => {
    /*

    show like if no like, otherwise unlike

    */

    return(
        <VStack bg='palette.3' w={{base : '400px', md :'700px'}} p='20px' gap='20px' borderRadius='10px'>
            <Flex direction='row' w='100%' gap='20px'>
                <Image src={post.author.image} w='50px' objectFit='cover' borderRadius='100%'/>
                <Flex direction='column'>
                    <Link color='palette.1'>
                        {`${post.author.first_name} ${post.author.last_name}`}
                    </Link>
                    <Text color='palette.1'>
                        {post.date}
                    </Text>
                </Flex>
            </Flex>
            <Content content={post.content} markdown={post.markdown} math={post.math} img={post.image}/>
            <Flex direction='row' justify='space-between' w='100%' align='center'>
                <Text color='palette.5'>
                    {post.likes.length} likes
                </Text>
                <Button border='none' bg='palette.2' w='150px'
                    css={{
                        '&:hover': {
                            backgroundColor: '#11999E',
                        },
                    }}
                >
                    <Text color='palette.1'>
                        Like
                    </Text>
                </Button>
            </Flex>
            <Text color='palette.1' w='100%' fontWeight='600'>
                Comments
            </Text>
            {
                (post.comments).map(
                    i => {
                        return(
                            <Comment comment={i}/>
                        )
                    }
                )
            }
            <CommentEditor/>
        </VStack>
    )
}