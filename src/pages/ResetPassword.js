import { Success } from "./Success"
import { Flex, Heading, VStack, Input, Button, InputRightElement, InputGroup, Text } from "@chakra-ui/react"
import { useState } from "react"

export const ResetPassword = () => {
    /*
        After submission check if server returns okay, if okay show success
    */
    const [ok, setOk] = useState(false);
    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)

    return(
        ok ? 
        <Success text="Password has been reset."/>
        :
        <Flex bg='palette.4' minH={'100vh'} justify='center' align='center'>
            <VStack p='30px' bg='palette.3' borderRadius='10px' gap='30px'>
                <Heading color='palette.5'>
                    Reset Password
                </Heading>
                <VStack gap='10px'>
                    <VStack w='100%'>
                        <Text color='palette.1' w='100%'>
                            Password
                        </Text>
                        <InputGroup>
                            <Input
                                pr='4.5rem'
                                type={show1 ? 'text' : 'password'}
                                placeholder='Enter password'
                                bg='palette.2'
                                style={{
                                    "border" : "none"
                                }}
                                color='palette.1'
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={() => setShow1(!show1)} bg='palette.4'
                                    css={{
                                        '&:hover': {
                                            backgroundColor: '#11999E',
                                        },
                                    }}
                                >
                                <Text color='palette.1'>{show1 ? 'Hide' : 'Show'}</Text>
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </VStack>
                    <VStack w='100%'>
                        <Text color='palette.1' w='100%'>
                            Confirm Password
                        </Text>
                        <InputGroup>
                            <Input
                                pr='4.5rem'
                                type={show2 ? 'text' : 'password'}
                                placeholder='Enter password'
                                bg='palette.2'
                                style={{
                                    "border" : "none"
                                }}
                                color='palette.1'
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={() => setShow2(!show2)} bg='palette.4'
                                    css={{
                                        '&:hover': {
                                            backgroundColor: '#11999E',
                                        },
                                    }}
                                >
                                <Text color='palette.1'>{show2 ? 'Hide' : 'Show'}</Text>
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </VStack>
                </VStack>
                <VStack w='100%' gap='15px'>
                    <Button bg='palette.4' minW='100%'
                        css={{
                            '&:hover': {
                                backgroundColor: '#11999E',
                            },
                        }}
                        onClick={() => setOk(!ok)}
                    >
                        <Text color='palette.1'>Submit</Text>
                    </Button>
                    <Button bg='palette.4' minW='100%'
                        css={{
                            '&:hover': {
                                backgroundColor: '#11999E',
                            },
                        }}
                    >
                        <Text color='palette.1'>Back to Login</Text>
                    </Button>
                </VStack>
            </VStack>
        </Flex> 
    )
}