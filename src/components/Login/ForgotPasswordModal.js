import {
    ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, VStack, Input, Button, Text
} from '@chakra-ui/react';

export const ForgotPasswordModal = () => {
    return(
        <>
        <ModalOverlay />
        <ModalContent bg='palette.3'>
            <ModalHeader color='palette.1'>Forgot Password</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <VStack gap='10px'>
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
                    }}
                >
                    <Text color='palette.1'>Submit</Text>
                </Button>
            </ModalFooter>
        </ModalContent>
        </>
    )
}