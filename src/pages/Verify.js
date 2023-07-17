import { Success } from "./Success"
import { useEffect, useState } from "react"
import { Box } from "@chakra-ui/react";
import { useErrorBoundary } from "react-error-boundary";

export const Verify = () => {
    /*

        Check if token return OK, if ok show success page, else show error

    */

    const { showBoundary } = useErrorBoundary();
    const [ok, setOk] = useState(false);
    const api_url = process.env.REACT_APP_API_URL;

    useEffect(
        () => {
            (async () => {
                const searchParams = new URLSearchParams(window.location.search);
                const token = searchParams.get('token');
                if (token === null){
                    const error = new Error("Token not found.");
                    error.status = 404;
                    showBoundary(error);
                    return;
                }
                
                const res = await fetch(
                    api_url + '/auth/verify-email',
                    {
                        method : "POST",
                        headers: {
                        'Content-Type': 'application/json'
                        },
                        body : JSON.stringify({emailToken : token})
                    }
                );

                const data = await res.json();

                if (res.ok){
                    setOk(true);
                }else{
                    const error = new Error(data.error.result);
                    error.status = res.status;
                    showBoundary(error);
                    return;
                }

            })()
        }
    ,[])

    return(
        ok ? 
        <Success text="You are verified."/>
        :
        <Box bg='palette.4' minH = '100vh'>
        </Box>
    )
}