import { Flex, Heading, VStack, Input, Button, InputRightElement, InputGroup, Text } from "@chakra-ui/react"
import { useState } from "react"

export const Register = () => {
    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)

    return(
        <Flex bg='palette.4' minH={'100vh'} justify='center' align='center'>
            <VStack p='30px' bg='palette.3' borderRadius='10px' gap='30px'>
                <Heading color='palette.5'>
                    Register
                </Heading>
                <VStack gap='10px'>
                    <VStack w='100%'>
                        <Text color='palette.1' w='100%'>
                            First Name
                        </Text>
                        <Input
                            placeholder='Enter first name'
                            bg='palette.2'
                            style={{
                                "border" : "none"
                            }}
                            w='100%'
                        />
                    </VStack>
                    <VStack w='100%'>
                        <Text color='palette.1' w='100%'>
                            Last Name
                        </Text>
                        <Input
                            placeholder='Enter last name'
                            bg='palette.2'
                            style={{
                                "border" : "none"
                            }}
                            w='100%'
                        />
                    </VStack>
                    <VStack w='100%'>
                        <Text color='palette.1' w='100%'>
                            Email
                        </Text>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            bg='palette.2'
                            style={{
                                "border" : "none"
                            }}
                            w='100%'
                        />
                    </VStack>
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
                    <Button bg='palette.4' minW='200px'
                        css={{
                            '&:hover': {
                                backgroundColor: '#11999E',
                            },
                        }}
                    >
                        <Text color='palette.1'>Get Started</Text>
                    </Button>
                    <Button bg='palette.4' minW='200px'
                        css={{
                            '&:hover': {
                                backgroundColor: '#11999E',
                            },
                        }}
                    >
                        <Text color='palette.1'>Login</Text>
                    </Button>
                </VStack>
            </VStack>
        </Flex> 
    )
}