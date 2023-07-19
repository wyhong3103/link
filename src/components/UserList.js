import { 
    Flex, 
    VStack, 
    Image, 
    Button, 
    Link, 
    HStack,
    Center,
    Text
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";



export const UserList = ({selfid, users, fetchUsers}) => {
    const navigate = useNavigate();
    const { showBoundary } = useErrorBoundary();
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
        
        fetchUsers();
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
        
        fetchUsers();
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
        
        fetchUsers();
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
        
        fetchUsers();
    }

    const userType = {
        self : [
        ],
        friend : [
            ['Unlink', (id) => unlink(id)],
            ['Chat', (id) => go('/chat/'+ id)]
        ],
        stranger : [
            ['Link', (id) => link(id)],
            ['Chat', (id) => go('/chat/'+ id)]
        ],
        sent : [
            ['Requested', (id) => unsend(id)],
            ['Chat', (id) => go('/chat/'+ id)]
        ],
        accept : [
            ['Accept', (id) => accept(id)],
            ['Chat', (id) => go('/chat/'+ id)]
        ]
    }

    return(
        <VStack gap='20px' p='20px'>
            {
                users.length > 0 ?
                users.map(
                    i => 
                    <Flex direction={{base : 'column', sm : 'row'}}justify='space-between' w={{base : '200px', sm : '450px', md : '600px'}} bg='palette.3' p='20px' borderRadius='10px' gap='20px'>
                        <HStack gap='20px'>
                            <Image src={(i.image && api_url + i.image) || anonymousImage} alt='avatar' h='40px' w='40px' objectFit='cover' borderRadius='100%'/>
                            <Link href={`/profile/${i._id}`} color='palette.1' fontSize='17px'>
                                {`${i.first_name} ${i.last_name}`}
                            </Link>
                        </HStack>
                        <HStack gap='20px'>
                            {
                                userType[i.type].map(
                                    btn => 
                                    <Button border='none' bg='palette.2'
                                        css={{
                                            '&:hover': {
                                                backgroundColor: '#11999E',
                                            },
                                        }}
                                        onClick={() => btn[1](i._id)}
                                        color ='palette.1'
                                    >
                                        {btn[0]}
                                    </Button>
                                )
                            }
                        </HStack>
                    </Flex>
                )

                :

                <Center>
                    <Text color='palette.1'>
                        There is no one in this list.
                    </Text>
                </Center>
            }
        </VStack>
    )
}