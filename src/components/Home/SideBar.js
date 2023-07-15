import {VStack, Button, Image, Text} from '@chakra-ui/react';

export const SideBar = ({url}) => {
    return (
        <VStack w='300px'p='20px' bg='palette.3' borderRadius='10px' gap='20px'>
            <VStack>
                <Image src={url} alt='avatar' borderRadius='100%' w='150px'/>
                <Text color='palette.1' fontWeight='800'>
                    James
                </Text>
            </VStack>
            <VStack w='80%'>
                <Button border='none' bg='palette.2' w='100%'
                    css={{
                        '&:hover': {
                            backgroundColor: '#222831',
                        },
                    }}
                >
                    <Text color='palette.1'>
                        Profile
                    </Text>
                </Button>
                <Button border='none' bg='palette.2' w='100%'
                    css={{
                        '&:hover': {
                            backgroundColor: '#222831',
                        },
                    }}
                >
                    <Text color='palette.1'>
                        Chat
                    </Text>
                </Button>
                <Button border='none' bg='palette.2' w='100%'
                    css={{
                        '&:hover': {
                            backgroundColor: '#222831',
                        },
                    }}
                >
                    <Text color='palette.1'>
                        Friends
                    </Text>
                </Button>
                <Button border='none' bg='palette.2' w='100%'
                    css={{
                        '&:hover': {
                            backgroundColor: '#222831',
                        },
                    }}
                >
                    <Text color='palette.1'>
                        Link Up
                    </Text>
                </Button>
            </VStack>
        </VStack>
    )
}