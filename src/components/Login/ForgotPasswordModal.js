import {
    ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, Button, Text, FormControl, FormErrorMessage, FormHelperText, VStack
} from '@chakra-ui/react';
import { useState } from 'react';

export const ForgotPasswordModal = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState("");
    const [ok, setOk] = useState(false);
    const api_url = process.env.REACT_APP_API_URL;

    const submit = async () => {
        const res = await fetch(
            api_url + '/auth/reset-password',
            {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                credentials : 'include',
                body: JSON.stringify({email})
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

    const enterSubmit = (event) => {
        if (event.keyCode === 13) {
            submit()
        }
    };

    return(
        <>
        <ModalOverlay />
        <ModalContent bg='palette.3'>
            <ModalHeader color='palette.1'>Forgot Password</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <VStack gap='10px'>
                    <Text color='palette.1' w='100%'>
                        Please provide your email address below so that we can send you a recovery email for verification.
                    </Text>
                    <FormControl>
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
                            onChange={e => setEmail(e.target.value)}
                            onKeyDown={enterSubmit}
                        />
                    </FormControl>
                    <FormControl isInvalid={error.result && error.result.length > 0}>
                        <FormErrorMessage>
                            {error.result}
                        </FormErrorMessage>
                        <FormHelperText color='palette.1'>
                            {ok ? "A recovery email is sent to the email provided. Check your spam if you could not find the email." : null}
                        </FormHelperText>
                    </FormControl>
                </VStack>
            </ModalBody>

            <ModalFooter>
                <Button bg='palette.4' 
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
                    color='palette.1'
                    isDisabled={!(email.length > 0)}
                    onClick={submit}
                >
                    <Text color='palette.1'>Submit</Text>
                </Button>
            </ModalFooter>
        </ModalContent>
        </>
    )
}