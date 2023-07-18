import { ReactComponent as PencilLogo } from '../../assets/svgs/pencil.svg';
import { ReactComponent as BinLogo } from '../../assets/svgs/bin.svg';
import { Content } from "../Content"
import { Editor } from "../Editor";
import { 
    Flex, 
    Image, 
    Link, 
    VStack, 
    Box, 
    HStack, 
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react'
import { useErrorBoundary } from "react-error-boundary";

export const Comment = ({comment, postid, fetchPosts, userid}) => {
    const {showBoundary} = useErrorBoundary();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const api_url = process.env.REACT_APP_API_URL;
    const anonymousImage = `${api_url}/images/anonymous.jpg`;

    const update = async (clear, setError, formData) => {
        const res = await fetch(
            api_url + `/post/${postid}/comment/${comment._id}`,
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
            api_url + `/post/${postid}/comment/${comment._id}`,
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

    return(
        <>


            <Modal isOpen={isOpen} onClose={onClose} size={{base :'md', md : 'lg'}}>
                <ModalOverlay />
                <ModalContent p='5px' bg='palette.3'>
                    <ModalHeader color='palette.1'>Update Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Editor placeholder="Update your comment." cb={update} content={comment.content} markdown={comment.markdown} math={comment.math}/>
                    </ModalBody>
                </ModalContent>
            </Modal>


            <Flex direction='row' w='100%' gap='20px' align='center'>
                <Box>
                    <Image src={(comment.author.image && api_url + comment.author.image) || anonymousImage} w='50px' h='50px' objectFit='cover' borderRadius='100%'/>
                </Box>
                <Flex w='100%' direction='column'>  
                        <Flex direction='row' w='100%' justify='space-between' align='end'>
                            <Flex direction='row' w='100%'>
                                <Link color='palette.1' href={`/profile/${comment.author._id}`}>
                                    {`${comment.author.first_name} ${comment.author.last_name}` }
                                </Link>
                            </Flex>
                            {
                            userid === comment.author._id &&
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
                    <Box w={{base : '300px', md: '600px'}}>
                        <Content content={comment.content} markdown={comment.markdown} math={comment.math}/>
                    </Box>
                </Flex>
            </Flex>
        </>
    )
}