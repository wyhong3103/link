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


export const Users = () => {
    const [ self ] = useAuth();
    const { showBoundary } = useErrorBoundary();
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const api_url = process.env.REACT_APP_API_URL;

    const fetchUsers = async () => {
        const res = await fetch(
            api_url + `/user`,
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

        setUsers([...data.users]);
    }

    useEffect(
        () => {
            (async () => {
                if (self){
                    await fetchUsers();
                    setLoading(false);
                }
            })()
        }
    , [self])

    useEffect(
        () => {
            (async () => {
                console.log(users);
            })()
        }
    , [users])

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
            <UserList users={users}/>
        </VStack>
    )
}