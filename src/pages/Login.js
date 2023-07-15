import { 
    Flex, Heading, VStack, Input, Button, InputRightElement, Link, InputGroup, Text,
    Modal, useDisclosure
} from '@chakra-ui/react'
import { ForgotPasswordModal } from '../components/Login/ForgotPasswordModal'


import { useState } from "react"

export const Login = () => {
    const [show, setShow] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()


    return(
        <Flex bg='palette.4' minH={'100vh'} justify='center' align='center'>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ForgotPasswordModal/>
            </Modal>
            <VStack p='30px' bg='palette.3' borderRadius='10px' gap='30px'>
                <VStack>
                    <Heading color='palette.5'>
                        Link
                    </Heading>
                    <Text color='palette.1'>Start linking with your friends.</Text>
                </VStack>
                <VStack gap='10px'>
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
                            color='palette.1'
                        />
                    </VStack>
                    <VStack w='100%'>
                        <Text color='palette.1' w='100%'>
                            Password
                        </Text>
                        <InputGroup>
                            <Input
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='Enter password'
                                bg='palette.2'
                                style={{
                                    "border" : "none"
                                }}
                                color='palette.1'
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={() => setShow(!show)} bg='palette.4'
                                    css={{
                                        '&:hover': {
                                            backgroundColor: '#11999E',
                                        },
                                    }}
                                >
                                <Text color='palette.1'>{show ? 'Hide' : 'Show'}</Text>
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <Flex justify='end' direction='row' w='100%'>
                            <Link color='palette.1' fontSize='13px' onClick={onOpen}>
                                Forgot Password
                            </Link>
                        </Flex>
                    </VStack>
                </VStack>
                <VStack w='100%' gap='15px'>
                    <Button bg='palette.4' minW='100%'
                        css={{
                            '&:hover': {
                                backgroundColor: '#11999E',
                            },
                        }}
                    >
                        <Text color='palette.1'>Login</Text>
                    </Button>
                    <Button bg='palette.4' minW='100%'
                        css={{
                            '&:hover': {
                                backgroundColor: '#11999E',
                            },
                        }}
                    >
                        <Text color='palette.1'>Register</Text>
                    </Button>
                </VStack>
            </VStack>
        </Flex> 
    )
}