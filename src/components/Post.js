import { useErrorBoundary } from "react-error-boundary"
import { Editor } from "./Editor"
import { Comment } from "./Post/Comment"
import { Content } from "./Content"
import { Flex, VStack, Image, Button, Text, Link, HStack } from "@chakra-ui/react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react'
import { ReactComponent as PencilLogo } from '../assets/svgs/pencil.svg';
import { ReactComponent as BinLogo } from '../assets/svgs/bin.svg';
import { convertDateTime } from "../util/util"

export const Post = ({post, userid, fetchPosts}) => {
    const {showBoundary} = useErrorBoundary();
    const api_url = process.env.REACT_APP_API_URL;
    const anonymousImage = `${api_url}/images/anonymous.jpg`;
    const { isOpen, onOpen, onClose } = useDisclosure()

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

    const update = async (clear, setError, formData) => {
        const res = await fetch(
            api_url + `/post/${post._id}`,
            {
                method: 'PUT',
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
            onClose();
        } else if (res.status <= 402){
            setError(data.error.content);
        } else {
            const error = new Error(data.error.result);
            error.status = res.status;
            showBoundary(error) ;
        }
    }

    const del = async () => {
        const res = await fetch(
            api_url + `/post/${post._id}`,
            {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                },
                credentials : 'include',
            }
        );
        
        const data = await res.json();

        if (res.ok){
            fetchPosts();
        }else {
            const error = new Error(data.error.result);
            error.status = res.status;
            showBoundary(error) ;
        }
    }

    const submit = async (clear, setError, formData) => {
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
            clear();
        } else if (res.status <= 402){
            setError(data.error.content);
        } else {
            const error = new Error(data.error.result);
            error.status = res.status;
            showBoundary(error) ;
        }
    }

    return(
        <>

        <Modal isOpen={isOpen} onClose={onClose} size={{base :'md', md : 'lg'}}>
            <ModalOverlay />
            <ModalContent p='5px' bg='palette.3'>
                <ModalHeader color='palette.1'>Update Post</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Editor placeholder="Update your post." cb={update} content={post.content} markdown={post.markdown} math={post.math}/>
                </ModalBody>
            </ModalContent>
        </Modal>

        <VStack bg='palette.3' w={{base : '400px', md :'700px'}} p='20px' gap='20px' borderRadius='10px'>
            <Flex direction='row' w='100%' gap='20px' justify='space-between'>
                <HStack gap='20px'>
                    <Image src={post.author.image || anonymousImage} w='50px' objectFit='cover' borderRadius='100%'/>
                    <Flex direction='column'>
                        <Link color='palette.1'>
                            {`${post.author.first_name} ${post.author.last_name}`}
                        </Link>
                        <Text color='palette.1'>
                            {convertDateTime(post.date)}
                        </Text>
                    </Flex>
                </HStack>

                {
                userid === post.author._id &&
                <HStack gap='20px'>
                    <Button
                        bg='none'
                        css={{
                            '&:hover': {
                                backgroundColor: '#222831',
                            },
                            '&:active': {
                                backgroundColor: '#222831',
                            },
                        }}
                        p='15px'
                        onClick={onOpen}
                    >
                        <Image as={PencilLogo} alt='pencil-logo' fill='palette.1' width='25px' h='25px'/>
                    </Button> 
                    <Button
                        bg='none'
                        css={{
                            '&:hover': {
                                backgroundColor: '#222831',
                            },
                            '&:active': {
                                backgroundColor: '#222831',
                            },
                        }}
                        p='15px'
                        onClick={del}
                    >
                        <Image as={BinLogo} alt='bin-logo' fill='palette.1' width='25px' h='25px'/>
                    </Button> 
                </HStack>
                }
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
        </>
    )
}