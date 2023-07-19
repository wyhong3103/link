import { Content } from "../Content"
import { 
    Flex,
    Box,
    Text
} from "@chakra-ui/react"

export const Bubble = ({selfid, message}) => {

    return(
        message.author._id === selfid ?

        <Flex direction='row' justify='end' w='100%'>
            <Box maxW='70%'>
                <Content content={message.content} markdown={message.markdown} math={message.math}/>
            </Box>
        </Flex>

        :

        <Box w='100%' paddingRight='30%' gap='10px'>
            <Flex direction='column' justify='start' gap='10px' align='start'>
                <Text color='palette.1'>
                    {message.author.first_name} {message.author.last_name}
                </Text>
                <Box maxW='100%'>
                    <Content content={message.content} markdown={message.markdown} math={message.math}/>
                </Box>
            </Flex>
        </Box>


    )
}