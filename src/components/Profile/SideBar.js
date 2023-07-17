import {
    VStack, 
    Button, 
    Image, 
    Text, 
    HStack, 
    Link, 
    Center,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';

export const SideBar = ({selfid, user, fetchInfo}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { showBoundary } = useErrorBoundary();
    const navigate = useNavigate();
    const api_url = process.env.REACT_APP_API_URL;
    const anonymousImage = `${api_url}/images/anonymous.jpg`;

    const go = (url) => {
        navigate(url);
    }

    const link = async (id) => {
        const res = await fetch(
            api_url + `/user/${id}/friend-request`,
            {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                credentials : 'include',
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
        
        fetchInfo();
    }

    const unlink = async (id) => {
        const res = await fetch(
            api_url + `/user/${id}/friend/${selfid}`,
            {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                },
                credentials : 'include',
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
        
        fetchInfo();
    }

    const unsend = async (id) => {
        const res = await fetch(
            api_url + `/user/${id}/friend-request/${selfid}`,
            {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                },
                credentials : 'include',
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
        
        fetchInfo();
    }

    const accept = async (id) => {
        const res = await fetch(
            api_url + `/user/${selfid}/friend-request/${id}`,
            {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                credentials : 'include',
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
        
        fetchInfo();
    }


    const barType = {
        self : [
            ['Update Profile', () => go('/update')]
        ],
        friend : [
            ['Unlink', () => unlink(user._id)],
            ['Chat', () => go('/chat?friendid='+ user._id)]
        ],
        stranger : [
            ['Link', () => link(user._id)],
            ['Chat', (id) => go('/chat?friendid='+ id)]
        ],
        sent : [
            ['Requested', (id) => unsend(id)],
            ['Chat', (id) => go('/chat?friendid='+ id)]
        ],
        accept : [
            ['Accept', (id) => accept(id)],
            ['Chat', (id) => go('/chat?friendid='+ id)]
        ]

    }

    return (
        <>
        

        <Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside'> 
            <ModalOverlay />
            <ModalContent bg='palette.3' p='10px'>
                <ModalHeader color='palette.1'>Friends</ModalHeader>
                <ModalCloseButton />
                <ModalBody >
                    {
                        user.friends.length > 0 ? 
                        <VStack p='10px' borderRadius='10px' w='250px' gap='20px'>
                            {
                                user.friends.map(
                                    i => 
                                    <HStack w='100%' gap='20px'>
                                        <Image src={(i.image && api_url + i.image) || anonymousImage} alt='avatar' w='40px' h='40px' objectFit='cover' borderRadius='100%'/>
                                        <Link href={`/profile/${i._id}`} color='palette.1' fontSize='17px'>
                                            {`${i.first_name} ${i.last_name}`}
                                        </Link>
                                    </HStack>
                                )
                            }
                        </VStack>

                        :

                        <Center>
                            <Text color='palette.1'>
                                {user.last_name} has no friends yet.
                            </Text>
                        </Center>
                    }
                </ModalBody>
            </ModalContent>
        </Modal>
        

        <VStack>
            <VStack w='300px'p='20px' borderRadius='10px' gap='20px'>
                <VStack>
                    <Image src={(user.image && api_url + user.image) || anonymousImage} alt='avatar' borderRadius='100%' w='150px' h='150px' objectFit='cover'/>
                    <Text color='palette.1' fontWeight='800'>
                        {`${user.first_name} ${user.last_name}`}
                    </Text>
                </VStack>
                <VStack w='80%'>
                    {
                        barType[user.type].map(
                            btn => 
                            <Button border='none' bg='palette.2' w='100%'
                                css={{
                                    '&:hover': {
                                        backgroundColor: '#11999E',
                                    },
                                    '&:active': {
                                        backgroundColor: '#11999E',
                                    },
                                }}
                                onClick={() => btn[1](user._id)}
                            >
                                <Text color='palette.1'>
                                    {btn[0]}
                                </Text>
                            </Button>
                        )
                    }
                    <Button border='none' bg='palette.2' w='100%'
                        css={{
                            '&:hover': {
                                backgroundColor: '#11999E',
                            },
                            '&:active': {
                                backgroundColor: '#11999E',
                            },
                        }}
                        onClick={onOpen}
                    >
                        <Text color='palette.1'>
                            Friends
                        </Text>
                    </Button>
                </VStack>
            </VStack>
        </VStack>

        </>
    )
}