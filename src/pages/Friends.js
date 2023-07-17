import { Nav } from "../components/Nav"
import { UserList } from "../components/UserList"
import { 
    VStack,
    Spinner,
    Flex
} from "@chakra-ui/react"
import useAuth from "../hooks/useAuth"
import { useErrorBoundary } from "react-error-boundary"
import { useState, useEffect } from "react"


export const Friends = () => {
    const [ self ] = useAuth();
    const { showBoundary } = useErrorBoundary();
    const [loading, setLoading] = useState(true);
    const [friends, setFriends] = useState([]);
    const api_url = process.env.REACT_APP_API_URL;

    const fetchFriends = async () => {
        const res = await fetch(
            api_url + `/user/${self.userid}`,
            {
                credentials : 'include'
            }
        );

        const data = await res.json();

        if (!res.ok){
            const error = new Error(data.error.result);
            error.status = res.status;
            showBoundary(error);
            return;
        }

        setFriends([...data.user.friends]);
    }

    useEffect(
        () => {
            (async () => {
                if (self){
                    await fetchFriends();
                    setLoading(false);
                }
            })()
        }
    , [self])

    return(
        loading ?

        <Flex bg='palette.4' minH='100vh' justify='center' align='center'>
            <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='palette.6'
            size='xl'
            />
        </Flex>

        :

        <VStack minH='100vh' bg='palette.4'>
            <Nav id={self.userid} last_name={self.last_name}/>
            <UserList users={friends}/>
        </VStack>
    )
}