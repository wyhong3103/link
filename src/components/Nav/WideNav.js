import { Flex, VStack, HStack, Heading, Text, Input, Image, Button } from "@chakra-ui/react"
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
} from '@chakra-ui/react'
import { ReactComponent as ArrowDownLogo } from '../../assets/svgs/arrow-down.svg';
import { ReactComponent as ChatLogo } from '../../assets/svgs/chat.svg';
import { ReactComponent as FriendRequestLogo } from '../../assets/svgs/friend-requests.svg';


export const WideNav = () => {
    return(
        <Flex bg='palette.3' 
        direction='row' w='100%' h='80px' p='5px 40px 5px 40px' justify='space-between' align='center' pos='fixed'
        zIndex='99' shadow='base'
        >
            <HStack gap='40px'>
                <Heading color='palette.5'>
                    Link
                </Heading>
                    <HStack>
                        <Input
                            placeholder='Search for friends to link'
                            border='none'
                            bg='palette.2'
                            minW={['200px', '400px']}
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
            </HStack>
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
                >
                    <Image as={FriendRequestLogo} alt='friend-request-logo' fill='palette.1' width='25px'/>
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
                >
                    <Image as={ChatLogo} alt='chat-logo' fill='palette.1' width='25px'/>
                </Button> 
                <Popover placement='bottom-start'>
                    <PopoverTrigger>
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
                    >
                        <HStack gap='5px'>
                            <Text color='palette.1' fontSize='17px'>
                                James
                            </Text>
                            <Image as={ArrowDownLogo} alt='arrow-down-logo' fill='palette.1' width='25px'/>
                        </HStack>
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent bg='palette.2' border='none' w='200px'>
                        <PopoverBody>
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
                                        Log Out
                                    </Text>
                                </Button>
                            </VStack>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </HStack>
        </Flex>
    )
}