import { useNavigate } from "react-router-dom";
import { Flex, VStack, Image, Button, Link, HStack } from "@chakra-ui/react"

export const UserList = ({friendlist, users}) => {
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

    const unsend = (id) => {
        // deal with API
    }

    const accept = (id) => {
        // deal with API
    }

    const userType = {
        friend : [
            ['Unlink', (id) => unlink(id)],
            ['Chat', (id) => go('/chat?friendid='+ id)]
        ],
        stranger : [
            ['Link', (id) => link(id)],
            ['Chat', (id) => go('/chat?friendid='+ id)]
        ],
        requested : [
            ['Requested', (id) => unsend(id)],
            ['Chat', (id) => go('/chat?friendid='+ id)]
        ],
        accept : [
            ['Accept', (id) => accept(id)],
            ['Chat', (id) => go('/chat?friendid='+ id)]
        ]
    }

    return(
        <VStack gap='20px' p='20px'>
            {
                users.map(
                    i => 
                    <Flex justify='space-between' w='600px' bg='palette.3' p='20px' borderRadius='10px'>
                        <HStack gap='20px'>
                            <Image src={i.image} alt='avatar' w='40px' objectFit='cover' borderRadius='100%'/>
                            <Link path={`/profile/${i._id}`} color='palette.1' fontSize='17px'>
                                {`${i.first_name} ${i.last_name}`}
                            </Link>
                        </HStack>
                        <HStack gap='20px'>
                            {
                                userType[i.type].map(
                                    i => 
                                    <Button border='none' bg='palette.2'
                                        css={{
                                            '&:hover': {
                                                backgroundColor: '#11999E',
                                            },
                                        }}
                                        onClick={i[1]}
                                        color ='palette.1'
                                    >
                                        {i[0]}
                                    </Button>
                                )
                            }
                        </HStack>
                    </Flex>
                )
            }
        </VStack>
    )
}