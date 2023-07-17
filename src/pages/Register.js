import { 
    Flex, 
    Heading, 
    VStack, 
    Input, 
    Button, 
    InputRightElement, 
    InputGroup, 
    Text, 
    FormControl, 
    FormErrorMessage, 
    FormLabel 
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import { useState } from "react"

export const Register = () => {
    const navigate = useNavigate();
    const [formData, 
    setFormData] = useState({
        first_name : '',
        last_name : '',
        email : '',
        password : '',
        repassword : ''
    });
    const [ok, setOk] = useState(false);
    const [error, setError] = useState({});
    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    const api_url = process.env.REACT_APP_API_URL;

    const handleInputChange = (field, value) => {
        const temp = {...formData};
        temp[field] = value;
        setFormData({...temp});
    }

    const register = async () => {
        const res = await fetch(
            api_url + '/auth/register',
            {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                credentials : 'include',
                body: JSON.stringify(formData)
            }
        );
        
        const data = await res.json();

        if (res.ok){
            setOk(true);
            setError({});
        } else {
            setOk(false);
            setError({...data.error});
        }
    }

    return(
        <Flex bg='palette.4' minH={'100vh'} justify='center' align='center' p='10px'>

            <VStack p='30px' bg='palette.3' borderRadius='10px' gap='30px' w='400px'>

                <Heading color='palette.5'>
                    Register
                </Heading>

                <VStack gap='10px' w='100%'>

                    <FormControl w='100%' isInvalid={error.first_name && error.first_name.length > 0}>
                        <FormLabel color='palette.1' w='100%'>
                            First Name
                        </FormLabel>
                        <Input
                            placeholder='Enter first name'
                            bg='palette.2'
                            style={{
                                "border" : "none"
                            }}
                            w='100%'
                            color='palette.1'
                            value={formData.first_name}
                            onChange={(e) => handleInputChange('first_name', e.target.value)}
                        />
                        <FormErrorMessage>
                            {error.first_name}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl w='100%' isInvalid={error.last_name && error.last_name.length > 0}>
                        <FormLabel color='palette.1' w='100%'>
                            Last Name
                        </FormLabel>
                        <Input
                            placeholder='Enter last name'
                            bg='palette.2'
                            style={{
                                "border" : "none"
                            }}
                            w='100%'
                            value={formData.last_name}
                            color='palette.1'
                            onChange={(e) => handleInputChange('last_name', e.target.value)}
                        />
                        <FormErrorMessage>
                            {error.last_name}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl w='100%' isInvalid={error.email && error.email.length > 0}>
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
                            value={formData.email}
                            color='palette.1'
                            onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                        <FormErrorMessage>
                            {error.email}
                        </FormErrorMessage>
                    </FormControl>

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
                                onChange={(e) => handleInputChange('password', e.target.value)}
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
                                onChange={(e) => handleInputChange('repassword', e.target.value)}
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

                    <FormControl isInvalid={error.result && error.result.length > 0}>
                        <FormErrorMessage>
                            {error.result}
                        </FormErrorMessage>
                    </FormControl>
                    <Text color='palette.1'>
                        {ok ? "A verification email is sent. Check your spam if you could not find the email." : null}
                    </Text>

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
                        onClick={register}
                    >
                        <Text color='palette.1'>Get Started</Text>
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