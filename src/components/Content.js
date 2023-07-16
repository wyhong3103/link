import { Box } from "@chakra-ui/react"

export const Content = ({content, markdown, math, image}) => {
    return(
        <Box w='100%' bg='palette.4' p='10px' borderRadius='10px'>
            <p 
                style={
                {
                    'color' : '#eeeeee'
                }
                }
            >
                {content}
            </p>
        </Box>
    )
}