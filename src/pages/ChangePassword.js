import { Nav } from "../components/Nav"
import { 
    VStack, 
    Button, 
    Input, 
    Text, 
    Heading, 
    InputGroup, 
    InputRightElement,
    Flex,
    Spinner,
    FormErrorMessage,
    FormControl,
    FormLabel
} from "@chakra-ui/react"
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useErrorBoundary } from "react-error-boundary";

export const ChangePassword = () => {
    /*
    
    Send to API

    */
    const [ self ] = useAuth();
    const { showBoundary } = useErrorBoundary();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        old_password : '',
        new_password : '',
        new_repassword : ''
    })
    const [error, setError] = useState({
        old_password : '',
        new_password : '',
        new_repassword : ''
    })
    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    const [show3, setShow3] = useState(false)
    const api_url = process.env.REACT_APP_API_URL;

    const handleInputChange = (field, value) => {
        const temp = {...formData};
        temp[field] = value;
        setFormData({...temp});
    }

    const submit = async () => {
        const res = await fetch(
            api_url + `/user/${self.userid}/password`,
            {
                method: 'PUT',
                credentials : 'include',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }
        );
        
        const data = await res.json();

        if (res.ok){
            setFormData({
                old_password : '',
                new_password : '',
                new_repassword : ''
            })
        } 
        else if (res.status <= 402){
            setError(data.error);
        } else {
            const error = new Error(data.error.result);
            error.status = res.status;
            error.isLogged = true;
            showBoundary(error);
        }
    }

    useEffect(
        () => {
            (async () => {
                if (self){
                    setLoading(false);
                }
            })()
        }
    , [self])

    return(
        loading ?

        <Flex bg='palette.4' minH='100vh' justify='center' align='center'>
            <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='palette.6'
            size='xl'
            />
        </Flex>

        :

        <VStack minH='100vh' bg='palette.4'>

            <Nav id={self.userid} last_name={self.last_name}/>

            <VStack bg='palette.3' p='30px' borderRadius='10px' gap='20px' w='400px' margin='20px'> 

                <Heading color='palette.1' fontSize='25px'>
                    Change Password
                </Heading>

                <VStack gap='10px' w='100%'>

                    <FormControl w='100%' isInvalid={error.old_password && error.old_password.length > 0}>
                        <FormLabel color='palette.1' w='100%'>
                            Old Password
                        </FormLabel>
                        <InputGroup>
                            <Input
                                pr='4.5rem'
                                type={show1 ? 'text' : 'password'}
                                placeholder='Enter old password'
                                bg='palette.2'
                                style={{
                                    "border" : "none"
                                }}
                                color='palette.1'
                                value={formData.old_password}
                                onChange={(e) => handleInputChange('old_password', e.target.value)}
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
                            {error.old_password}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl w='100%' isInvalid={error.new_password && error.new_password.length > 0}>
                        <FormLabel color='palette.1' w='100%'>
                            New Password
                        </FormLabel>
                        <InputGroup>
                            <Input
                                pr='4.5rem'
                                type={show2 ? 'text' : 'password'}
                                placeholder='Enter new password'
                                bg='palette.2'
                                style={{
                                    "border" : "none"
                                }}
                                color='palette.1'
                                value={formData.new_password}
                                onChange={(e) => handleInputChange('new_password', e.target.value)}
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
                            {error.new_password}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl w='100%' isInvalid={error.new_repassword && error.new_repassword.length > 0}>
                        <FormLabel color='palette.1' w='100%'>
                            Confirm New Password
                        </FormLabel>
                        <InputGroup>
                            <Input
                                pr='4.5rem'
                                type={show3 ? 'text' : 'password'}
                                placeholder='Enter new password'
                                bg='palette.2'
                                style={{
                                    "border" : "none"
                                }}
                                color='palette.1'
                                value={formData.new_repassword}
                                onChange={(e) => handleInputChange('new_repassword', e.target.value)}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={() => setShow3(!show3)} bg='palette.4'
                                    css={{
                                        '&:hover': {
                                            backgroundColor: '#11999E',
                                        },
                                        '&:active': {
                                            backgroundColor: '#11999E',
                                        },
                                    }}
                                >
                                <Text color='palette.1'>{show3 ? 'Hide' : 'Show'}</Text>
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                            {error.new_repassword}
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
                        onClick={submit}
                    >
                        <Text color='palette.1'>Submit</Text>
                    </Button>
                </VStack>

            </VStack>
        </VStack>
    )
}