import { useNavigate } from "react-router-dom";
import { 
    Flex, 
    VStack, 
    Button,
    Text, 
    Heading 
} from "@chakra-ui/react"

export const Success = ({text}) => {
    const navigate = useNavigate();
    return(
        <Flex bg='palette.4' minH={'100vh'} justify='center' align='center'>
            <VStack p='30px' bg='palette.3' borderRadius='10px' gap='30px'>
                <Heading color='palette.5'>
                    Link
                </Heading>
                <Text color='palette.1' fontSize='17px'>
                    {text}
                </Text>
                <Button bg='palette.4' minW='200px'
                    css={{
                        '&:hover': {
                            backgroundColor: '#11999E',
                        },
                        '&:active': {
                            backgroundColor: '#11999E',
                        },
                    }}
                    onClick={() => navigate('/login')}
                >
                    <Text color='palette.1'>Login</Text>
                </Button>
            </VStack>
        </Flex> 
    )
}