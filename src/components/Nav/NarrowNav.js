import { Flex, VStack, HStack, Heading, Text, Input, Image, Button, useDisclosure } from "@chakra-ui/react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
} from '@chakra-ui/react'
import { ReactComponent as SearchLogo } from '../../assets/svgs/search.svg';
import { ReactComponent as BurgerLogo } from '../../assets/svgs/burger.svg';


export const NarrowNav = () => {
    const { isOpen : isOpenBurger, onOpen : onOpenBurger, onClose : onCloseBurger } = useDisclosure()
    const { isOpen : isOpenSearch, onOpen : onOpenSearch, onClose : onCloseSearch } = useDisclosure()

    return(
        <Flex bg='palette.3' 
        direction='row' w='100%' h='80px' p='5px 40px 5px 40px' justify='space-between' align='center' pos='sticky' top='0'
        zIndex='99' shadow='base'
        >
            <Heading color='palette.5'>
                Link
            </Heading>
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