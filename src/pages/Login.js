import { useNavigate } from 'react-router-dom'
import { 
    Flex, Heading, VStack, Input, Button, InputRightElement, Link, InputGroup, Text,
    Modal, useDisclosure, FormErrorMessage, FormControl, FormLabel
} from '@chakra-ui/react'
import { ForgotPasswordModal } from '../components/Login/ForgotPasswordModal'


import { useState } from "react"

export const Login = () => {
    /*

        Login
        - email & password state
        - form submit 
            - wait for response to tell fail or success

            if failed
                - check field
                - print error message
            else
                - redirect to /
        
        Forget Password
        - submit form
            - if response OK / Not ok
            - give message

    */

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [resultError, setResultError] = useState("");
    const [pwError, setPwError] = useState("");
    const [pw, setPw] = useState("");
    const [show, setShow] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const api_url = process.env.REACT_APP_API_URL;

    const login = async () => {
        const res = await fetch(
            api_url + '/auth/login',
            {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                credentials : 'include',
                body: JSON.stringify({email, password : pw})
            }
        );
        
        const data = await res.json();

        if (res.ok){
            navigate('/');
        } else {
            if (data.error.email) setEmailError(data.error.email);
            if (data.error.password) setPwError(data.error.password);
            if (data.error.result) setResultError(data.error.result);
        }
    }


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
                    <FormControl isInvalid={emailError.length > 0}>
                            <FormLabel color='palette.1' w='100%'>
                                Email
                            </FormLabel>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                bg='palette.2'
                                style={{
                                    "border" : "none"
                                }}
                                w='100%'
                                color='palette.1'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <FormErrorMessage>
                                {emailError}
                            </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={pwError.length > 0}>
                        <FormLabel color='palette.1' w='100%'>
                            Password
                        </FormLabel>
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
                                value={pw}
                                onChange={(e) => setPw(e.target.value)}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={() => setShow(!show)} bg='palette.4'
                                    css={{
                                        '&:hover': {
                                            backgroundColor: '#11999E',
                                        },
                                        '&:active': {
                                            backgroundColor: '#11999E',
                                        },
                                    }}
                                >
                                <Text color='palette.1'>{show ? 'Hide' : 'Show'}</Text>
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                            {pwError}
                        </FormErrorMessage>
                        <Flex justify='end' direction='row' w='100%'>
                            <Link color='palette.1' fontSize='13px' onClick={onOpen}>
                                Forgot Password
                            </Link>
                        </Flex>
                    </FormControl>
                    <VStack>
                        <FormControl isInvalid={resultError.length > 0}>
                            <FormErrorMessage>
                                {resultError}
                            </FormErrorMessage>
                        </FormControl>
                    </VStack>
                </VStack>
                <VStack w='100%' gap='15px'>
                    <Button bg='palette.4' minW='100%'
                        css={{
                            '&:hover': {
                                backgroundColor: '#11999E',
                            },
                            '&:active': {
                                backgroundColor: '#11999E',
                            },
                            '&:hover:disabled': {
                                backgroundColor: '#222831',
                            },
                        }}
                        onClick={login}
                        color='palette.1'
                        isDisabled={!(email.length > 0 && pw.length > 0)}
                    >
                        Login
                    </Button>
                    <Button bg='palette.4' minW='100%'
                        css={{
                            '&:hover': {
                                backgroundColor: '#11999E',
                            },
                            '&:active': {
                                backgroundColor: '#11999E',
                            },
                        }}
                        onClick={() => navigate('/register')}
                    >
                        <Text color='palette.1'>Register</Text>
                    </Button>
                </VStack>
            </VStack>
        </Flex> 
    )
}