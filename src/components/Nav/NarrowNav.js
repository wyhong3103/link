import { useNavigate } from "react-router-dom";
import { Flex, VStack, HStack, Heading, Text, Input, Image, Button, useDisclosure } from "@chakra-ui/react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
} from '@chakra-ui/react'
import { ReactComponent as SearchLogo } from '../../assets/svgs/search.svg';
import { ReactComponent as BurgerLogo } from '../../assets/svgs/burger.svg';
import { useState } from "react";


export const NarrowNav = ({id}) => {
    const navigate = useNavigate();
    const { isOpen : isOpenBurger, onOpen : onOpenBurger, onClose : onCloseBurger } = useDisclosure()
    const { isOpen : isOpenSearch, onOpen : onOpenSearch, onClose : onCloseSearch } = useDisclosure()
    const [keyword, setKeyword] = useState('');

    const search = () => {
        if (keyword.length > 0){
            navigate(`/search?keyword=${keyword}`)
            window.location.reload();
        }
    }

    return(
        <Flex bg='palette.3' 
        direction='row' w='100%' h='80px' p='5px 40px 5px 40px' justify='space-between' align='center' pos='sticky' top='0'
        zIndex='99' shadow='base'
        >
            <Button bg='none'
                color='palette.5'
                css={{
                    '&:hover': {
                        backgroundColor : 'transparent',
                        color: '#11999E',
                    },
                    '&:active': {
                        backgroundColor : 'transparent',
                        color: '#11999E',
                    },
                }}
                onClick={() => navigate('/')}
            >
                <Heading color='palette.5'
                    css={{
                        '&': {
                            transition : 'all 0.3s'
                        },
                        '&:hover': {
                            color : '#a7fcee',
                            textShadow: '0 0px 30px #afe0f5'
                        },
                    }}
                >
                    Link
                </Heading>
            </Button>
            <HStack gap='5px'>
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
                    onClick={onOpenSearch}
                >
                    <Image as={SearchLogo} alt='search-logo' fill='palette.1' width='20px' h='25px'/>
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
                    onClick={onOpenBurger}
                >
                    <Image as={BurgerLogo} alt='burger-logo' fill='palette.1' width='40px' h='30px'/>
                </Button>
            </HStack>
            <Modal isOpen={isOpenSearch} onClose={onCloseSearch}>
                <ModalOverlay />
                <ModalContent bg='palette.3' w={{base : '300px', md : '600px'}}>
                    <ModalBody p='5px'>
                        <HStack>
                            <Input
                                placeholder='Search for friends to link'
                                border='none'
                                bg='palette.2'
                                color='palette.1'
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            <Button bg='palette.4'
                                css={{
                                    '&:hover': {
                                        backgroundColor: '#11999E',
                                    },
                                    '&:active': {
                                        backgroundColor: '#11999E',
                                    },
                                }}
                                onClick={search}
                            >
                            <Text color='palette.1'>Search</Text>
                            </Button>
                        </HStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Modal isOpen={isOpenBurger} onClose={onCloseBurger}>
                <ModalOverlay />
                <ModalContent bg='palette.3' w='300px'>
                    <ModalBody>
                        <VStack>
                            <Button border='none' bg='none' w='100%'
                                css={{
                                    '&:hover': {
                                        backgroundColor: '#222831',
                                    },
                                    '&:active': {
                                        backgroundColor: '#222831',
                                    },
                                }}
                                onClick={() => navigate('/friend-requests')}
                            >
                                <Text color='palette.1'>
                                    Friend Requests
                                </Text>
                            </Button>
                            <Button border='none' bg='none' w='100%'
                                css={{
                                    '&:hover': {
                                        backgroundColor: '#222831',
                                    },
                                    '&:active': {
                                        backgroundColor: '#222831',
                                    },
                                }}
                                onClick={() => navigate('/chat')}
                            >
                                <Text color='palette.1'>
                                    Chat
                                </Text>
                            </Button>
                            <Button border='none' bg='none' w='100%'
                                css={{
                                    '&:hover': {
                                        backgroundColor: '#222831',
                                    },
                                    '&:active': {
                                        backgroundColor: '#222831',
                                    },
                                }}
                                onClick={() => navigate('/update')}
                            >
                                <Text color='palette.1'>
                                    Update Profile
                                </Text>
                            </Button>
                            <Button border='none' bg='none' w='100%'
                                css={{
                                    '&:hover': {
                                        backgroundColor: '#222831',
                                    },
                                    '&:active': {
                                        backgroundColor: '#222831',
                                    },
                                }}
                                onClick={() => navigate(`/profile/${id}`)}
                            >
                                <Text color='palette.1'>
                                    View Profile
                                </Text>
                            </Button>
                            <Button border='none' bg='none' w='100%'
                                css={{
                                    '&:hover': {
                                        backgroundColor: '#222831',
                                    },
                                    '&:active': {
                                        backgroundColor: '#222831',
                                    },
                                }}
                                onClick={() => navigate('/friends')}
                            >
                                <Text color='palette.1'>
                                    Friends
                                </Text>
                            </Button>
                            <Button border='none' bg='none' w='100%'
                                css={{
                                    '&:hover': {
                                        backgroundColor: '#222831',
                                    },
                                    '&:active': {
                                        backgroundColor: '#222831',
                                    },
                                }}
                                onClick={() => navigate('/users')}
                            >
                                <Text color='palette.1'>
                                    Link Up
                                </Text>
                            </Button>
                            <Button border='none' bg='none' w='100%'
                                css={{
                                    '&:hover': {
                                        backgroundColor: '#222831',
                                    },
                                    '&:active': {
                                        backgroundColor: '#222831',
                                    },
                                }}
                                onClick={() => navigate('/change-password')}
                            >
                                <Text color='palette.1'>
                                    Change Password
                                </Text>
                            </Button>
                            <Button border='none' bg='none' w='100%'
                                css={{
                                    '&:hover': {
                                        backgroundColor: '#222831',
                                    },
                                    '&:active': {
                                        backgroundColor: '#222831',
                                    },
                                }}
                                onClick={() => navigate('/logout')}
                            >
                                <Text color='palette.1'>
                                    Log Out
                                </Text>
                            </Button>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
    )
}