import { useNavigate } from 'react-router-dom';
import {VStack, Button, Image, Text, HStack, Heading, Link} from '@chakra-ui/react';

export const SideBar = ({url, type, id, friends}) => {
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
                </VStack>
            </VStack>
            <VStack bg='palette.3' p='20px' borderRadius='10px' w='300px' gap='20px'>
                <Heading fontSize='25px' color='palette.1' textAlign='left' w='100%'>
                    Friends
                </Heading>
                {
                    friends.map(
                        i => 
                        <HStack w='100%' gap='20px'>
                            <Image src={i.image} alt='avatar' w='50px' objectFit='cover' borderRadius='100%'/>
                            <Link path={`/profile/${i._id}`} color='palette.1' fontSize='20px'>
                                {`${i.first_name} ${i.last_name}`}
                            </Link>
                        </HStack>
                    )
                }
            </VStack>
        </VStack>
    )
}