import {Flex, Textarea, Checkbox, HStack, VStack, Text, Button} from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react'
import { Content } from '../Content'

export const CommentEditor = () => {
    const { isOpen : isOpenPreview, onOpen : onOpenPreview, onClose : onClosePreview } = useDisclosure()

    return(
        <>
        <Modal isOpen={isOpenPreview} onClose={onClosePreview}>
            <ModalOverlay />
            <ModalContent bg='palette.2'>
                <ModalHeader color='palette.1'>Preview</ModalHeader>
                <ModalCloseButton />
                <ModalBody p='20px'>
                    <Content/>
                </ModalBody>
            </ModalContent>
        </Modal>
        <VStack w='100%' gap='0'>
            <Textarea
                placeholder='Leave a comment.'
                bg='palette.4'
                border='none'
                resize='none'
                h='150px'
                color='palette.1'
            />
            <Flex bg='palette.2' w='100%' 
            borderBottomLeftRadius='10px' 
            borderBottomRightRadius='10px' 
            align='center' 
            justify='space-between'
            p='3px 10px 3px 10px' 
            >
                <HStack w='100%'>
                    <Checkbox colorScheme='palette.6' border='none'>
                        <Text color='palette.1'>
                            Markdown
                        </Text>
                    </Checkbox>
                    <Checkbox colorScheme='#11999E'>
                        <Text color='palette.1'>
                            LaTeX
                        </Text>
                    </Checkbox>
                </HStack>
                <HStack>
                    <Button bg='none'
                        color='palette.5'
                        css={{
                            '&:hover': {
                                backgroundColor : 'transparent',
                                color: '#11999E',
                            },
                            '&:active': {
                                backgroundColor : 'transparent',
                                color: '#11999E',
                            },
                        }}
                        onClick={onOpenPreview}
                    >
                        Preview
                    </Button>
                    <Button bg='none'
                        color='palette.5'
                        css={{
                            '&:hover': {
                                backgroundColor : 'transparent',
                                color: '#11999E',
                            },
                            '&:active': {
                                backgroundColor : 'transparent',
                                color: '#11999E',
                            },
                        }}
                    >
                        Send
                    </Button>
                </HStack>
            </Flex>
        </VStack>
        </>
    )
}