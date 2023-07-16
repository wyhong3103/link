import { useNavigate } from 'react-router-dom';
import {VStack, Button, Image, Text, HStack, Heading, Link} from '@chakra-ui/react';
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

export const SideBar = ({url, type, id, friends}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate();

    const go = (url) => {
        navigate(url);
    }

    const link = (id) => {
        // deal with API
    }

    const unlink = (id) => {
        // deal with API
    }

    const barType = {
        self : [
            ['Update Profile', () => go('/update')]
        ],
        friend : [
            ['Unlink', () => unlink(id)],
            ['Chat', () => go('/chat?friendid='+ id)]
        ],
        stranger : [
            ['Link', () => link(id)]
        ]
    }

    return (
        <VStack>
            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside'> 
                <ModalOverlay />
                <ModalContent bg='palette.3'>
                    <ModalHeader color='palette.1'>Friends</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <VStack p='10px' borderRadius='10px' w='250px' gap='20px'>
                            {
                                friends.map(
                                    i => 
                                    <HStack w='100%' gap='20px'>
                                        <Image src={i.image} alt='avatar' w='40px' objectFit='cover' borderRadius='100%'/>
                                        <Link path={`/profile/${i._id}`} color='palette.1' fontSize='17px'>
                                            {`${i.first_name} ${i.last_name}`}
                                        </Link>
                                    </HStack>
                                )
                            }
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <VStack w='300px'p='20px' borderRadius='10px' gap='20px'>
                <VStack>
                    <Image src={url} alt='avatar' borderRadius='100%' w='150px'/>
                    <Text color='palette.1' fontWeight='800'>
                        James
                    </Text>
                </VStack>
                <VStack w='80%'>
                    {
                        barType[type].map(
                            i => 
                            <Button border='none' bg='palette.2' w='100%'
                                css={{
                                    '&:hover': {
                                        backgroundColor: '#11999E',
                                    },
                                }}
                                onClick={i[1]}
                            >
                                <Text color='palette.1'>
                                    {i[0]}
                                </Text>
                            </Button>
                        )
                    }
                    <Button border='none' bg='palette.2' w='100%'
                        css={{
                            '&:hover': {
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
    )
}