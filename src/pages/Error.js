import { Flex, VStack, Heading, Text, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export const Error = ({error, resetErrorBoundary}) => {
    const navigate = useNavigate();

    return(
        <Flex minH='100vh' bg='palette.4' justify='center' align='center'>
            <VStack p='20px' bg='palette.3' w='250px' borderRadius='10px' gap='20px'>
                <Heading color='palette.1'>
                    {error.status}
                </Heading>
                <Text color='palette.1'>
                    {error.message}
                </Text>
                <Button bg='palette.4' minW='100%'
                    css={{
                        '&:hover': {
                            backgroundColor: '#11999E',
                        },
                        '&:active': {
                            backgroundColor: '#11999E',
                        }
                    }}
                    onClick={() => {
                        resetErrorBoundary()
                        navigate('/')
                    }}
                    color='palette.1'
                >
                    Back to Link
                </Button>
            </VStack>
        </Flex>
    )
}