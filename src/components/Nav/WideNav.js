import { ReactComponent as ArrowDownLogo } from '../../assets/svgs/arrow-down.svg';
import { ReactComponent as ChatLogo } from '../../assets/svgs/chat.svg';
import { ReactComponent as FriendRequestLogo } from '../../assets/svgs/friend-requests.svg';
import { 
    Flex,
    VStack, 
    HStack, 
    Heading, 
    Text, 
    Input, 
    Image, 
    Button ,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
} from "@chakra-ui/react"
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";


export const WideNav = ({last_name, id, fetchUsers}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');

    const search = () => {
        if (location.pathname === '/search'){
            // no refresh is needed if on the same page
            navigate(`/search?keyword=${keyword}`)
            fetchUsers()
        }
        else if (keyword.length > 0){
            navigate(`/search?keyword=${keyword}`)
        }
    }

    const go = (url) => {
        navigate(url);
        window.location.reload();
    }

    const enterSubmit = (event) => {
        if (event.keyCode === 13) {
            search();
        }
    };

    return(
        <Flex bg='palette.3' 
        direction='row' w='100%' h='80px' p='5px 40px 5px 40px' justify='space-between' align='center' pos='sticky' top='0'
        zIndex='99' shadow='base'
        >

            <HStack gap='40px'>

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
                    onClick={() => {
                        go('/')
                    }}
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

                    <HStack>
                        <Input
                            placeholder='Search for friends to link'
                            border='none'
                            bg='palette.2'
                            minW={['200px', '400px']}
                            color='palette.1'
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyDown={enterSubmit}
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
                            onClick={() => search()}
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
                    onClick={() => go('/friend-requests')}
                >
                    <Image as={FriendRequestLogo} alt='friend-request-logo' fill='palette.1' width='25px' h='25px'/>
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
                    onClick={() => go('/chat')}
                >
                    <Image as={ChatLogo} alt='chat-logo' fill='palette.1' width='25px' h='25px'/>
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
                                {last_name}
                            </Text>
                            <Image as={ArrowDownLogo} alt='arrow-down-logo' fill='palette.1' width='25px' h='25px'/>
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
                                    onClick={() => go('/update')}
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
                                    onClick={() => go(`/profile/${id}`)}
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
                                    onClick={() => go('/friends')}
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
                                    onClick={() => go('/users')}
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
                                    onClick={() => go('/change-password')}
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
                                    onClick={() => go('/logout')}
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