import { useNavigate } from "react-router-dom";
import { Success } from "./Success"
import { Flex, Heading, VStack, Input, Button, InputRightElement, InputGroup, Text, FormLabel, FormControl, FormErrorMessage } from "@chakra-ui/react"
import { useErrorBoundary } from "react-error-boundary";
import { useState } from "react"

export const ResetPassword = () => {
    /*
        After submission check if server returns okay, if okay show success
    */
    const navigate = useNavigate();
    const { showBoundary } = useErrorBoundary();
    const [ok, setOk] = useState(false);
    const [formData, setFormData] = useState({
        password : '',
        repassword : '',
    });
    const [error, setError] = useState({});
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const api_url = process.env.REACT_APP_API_URL;

    const handleInputChange = (field, value) => {
        const temp = {...formData};
        temp[field] = value;
        setFormData({...temp});
    }

    const submit = async () => {
        const searchParams = new URLSearchParams(window.location.search);
        const token = searchParams.get('token');
        if (token === null){
            const error = new Error("Token not found.");
            error.status = 404;
            showBoundary(error);
            return;
        }
        
        const res = await fetch(
            api_url + '/auth/verify-reset-password',
            {
                method : "POST",
                headers: {
                'Content-Type': 'application/json'
                },
                body : JSON.stringify({resetToken : token, password : formData.password, repassword : formData.repassword})
            }
        );

        const data = await res.json();

        if (res.ok){
            setOk(true);
        }else{
            if (data.error.result){
                const error = new Error(data.error.result);
                error.status = res.status;
                showBoundary(error);
            }else{
                setError({...data.error});
            }
        }
    }

    return(
        ok ? 
        <Success text="Password has been reset."/>
        :
        <Flex bg='palette.4' minH={'100vh'} justify='center' align='center'>
            <VStack p='30px' bg='palette.3' borderRadius='10px' gap='30px' w='400px'>
                <Heading color='palette.5'>
                    Reset Password
                </Heading>
                <VStack gap='10px' w='100%'>
                    <FormControl w='100%' isInvalid={error.password && error.password.length > 0}>
                        <FormLabel color='palette.1' w='100%'>
                            Password
                        </FormLabel>
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
                                value={formData.password}
                                onChange={(e) => handleInputChange('password',e.target.value)}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={() => setShow1(!show1)} bg='palette.4'
                                    css={{
                                        '&:hover': {
                                            backgroundColor: '#11999E',
                                        },
                                        '&:active': {
                                            backgroundColor: '#11999E',
                                        },
                                    }}
                                >
                                <Text color='palette.1'>{show1 ? 'Hide' : 'Show'}</Text>
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                            {error.password}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl w='100%' isInvalid={error.repassword && error.repassword.length > 0}>
                        <FormLabel color='palette.1' w='100%'>
                            Confirm Password
                        </FormLabel>
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
                                value={formData.repassword}
                                onChange={(e) => handleInputChange('repassword',e.target.value)}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={() => setShow2(!show2)} bg='palette.4'
                                    css={{
                                        '&:hover': {
                                            backgroundColor: '#11999E',
                                        },
                                        '&:active': {
                                            backgroundColor: '#11999E',
                                        },
                                    }}
                                >
                                <Text color='palette.1'>{show2 ? 'Hide' : 'Show'}</Text>
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                            {error.repassword}
                        </FormErrorMessage>
                    </FormControl>
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
                        }}
                        onClick={() => submit()}
                    >
                        <Text color='palette.1'>Submit</Text>
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
                        onClick={() => navigate('/login')}
                    >
                        <Text color='palette.1'>Back to Login</Text>
                    </Button>
                </VStack>
            </VStack>
        </Flex> 
    )
}