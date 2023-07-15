import { Success } from "./Success"
import { useState } from "react"
import { Box } from "@chakra-ui/react";

export const Verify = () => {
    /*

        Check if token return OK, if ok show success page, else show error

    */

    const [ok, setOk] = useState(true);
    return(
        ok ? 
        <Success text="You are verified."/>
        :
        <Box bg='palette.4' minH = '100vh'>
        </Box>
    )
}