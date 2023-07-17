import { Nav } from "../components/Nav"
import { 
    VStack, 
    Button, 
    Input, 
    Text, 
    Heading, 
    InputGroup, 
    InputRightElement
} from "@chakra-ui/react"
import { useState } from "react";

export const ChangePassword = () => {
    /*
    
    Send to API

    */
    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    const [show3, setShow3] = useState(false)

    return(
        <VStack minH='100vh' bg='palette.4'>

            <Nav/>

            <VStack bg='palette.3' p='30px' borderRadius='10px' gap='20px' w='400px' margin='20px'> 

                <Heading color='palette.1' fontSize='25px'>
                    Change Password
                </Heading>

                <VStack gap='10px' w='100%'>

                    <VStack w='100%'>
                        <Text color='palette.1' w='100%'>
                            Old Password
                        </Text>
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
                    </VStack>

                    <VStack w='100%'>
                        <Text color='palette.1' w='100%'>
                            New Password
                        </Text>
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
                    </VStack>

                    <VStack w='100%'>
                        <Text color='palette.1' w='100%'>
                            Confirm New Password
                        </Text>
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
                        }}
                    >
                        <Text color='palette.1'>Submit</Text>
                    </Button>
                </VStack>

            </VStack>
        </VStack>
    )
}