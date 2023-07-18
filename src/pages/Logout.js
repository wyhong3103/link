import { Flex, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router"

export const Logout = () => {
    const navigate = useNavigate();
    const api_url = process.env.REACT_APP_API_URL;

    useEffect(
        () => {
            (async () => {
                await fetch(
                    api_url + '/auth/logout',
                    {
                        method : 'POST',
                        credentials : 'include',
                    }
                )
                navigate('/login');
            })()
        }
    )

    return(
        <Flex bg='palette.4' minH='100vh' justify='center' align='center'>
            <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='palette.6'
            size='xl'
            />
        </Flex>
    )
}