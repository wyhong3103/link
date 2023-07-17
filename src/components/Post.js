import { useErrorBoundary } from "react-error-boundary"
import { Editor } from "./Editor"
import { Comment } from "./Post/Comment"
import { Content } from "./Content"
import { Flex, VStack, Image, Button, Text, Link } from "@chakra-ui/react"
import { convertDateTime } from "../util/util"

export const Post = ({post, userid, fetchPosts}) => {
    const {showBoundary} = useErrorBoundary();
    const api_url = process.env.REACT_APP_API_URL;
    const anonymousImage = `${api_url}/images/anonymous.jpg`;
    /*

    show like if no like, otherwise unlike

    */

    const like = async () => {
        const res = await fetch(
            api_url + `/post/${post._id}/like`,
            {
                method: 'POST',
                credentials : 'include',
            }
        );

        const data = await res.json();

        if (!res.ok){
            const error = new Error(data.error.result);
            error.status = res.status;
            showBoundary(error) ;
        }else{
            fetchPosts();
        }
    }

    const unlike = async () => {
        const res = await fetch(
            api_url + `/post/${post._id}/like`,
            {
                method: 'DELETE',
                credentials : 'include',
            }
        );

        const data = await res.json();

        if (!res.ok){
            const error = new Error(data.error.result);
            error.status = res.status;
            showBoundary(error) ;
        }else{
            fetchPosts();
        }
    }

    const submit = async (setError, formData) => {
        const res = await fetch(
            api_url + `/post/${post._id}/comment`,
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
        } else if (res.status <= 402){
            setError(data.error.content);
        } else {
            const error = new Error(data.error.result);
            error.status = res.status;
            showBoundary(error) ;
        }
    }

    return(
        <VStack bg='palette.3' w={{base : '400px', md :'700px'}} p='20px' gap='20px' borderRadius='10px'>
            <Flex direction='row' w='100%' gap='20px'>
                <Image src={post.author.image || anonymousImage} w='50px' objectFit='cover' borderRadius='100%'/>
                <Flex direction='column'>
                    <Link color='palette.1'>
                        {`${post.author.first_name} ${post.author.last_name}`}
                    </Link>
                    <Text color='palette.1'>
                        {convertDateTime(post.date)}
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
                        '&:active': {
                            backgroundColor: '#11999E',
                        },
                    }}
                    onClick={
                        !post.likes.includes(userid) ? like : unlike
                    }
                >
                    <Text color='palette.1'>
                        {!post.likes.includes(userid) ? 'Like' : 'Unlike'}
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
            <Editor placeholder="Write a comment." cb={submit}/>
        </VStack>
    )
}