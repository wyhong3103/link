import {Flex, Textarea, Checkbox, HStack, VStack, Text, Button, FormControl, FormErrorMessage} from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react'
import { Content } from './Content'
import { useState } from 'react'

export const Editor = ({placeholder, cb}) => {
    const [formData, setFormData] = useState({
        content : '',
        markdown : false,
        math : false
    });
    const [error, setError] = useState("");
    const { isOpen : isOpenPreview, onOpen : onOpenPreview, onClose : onClosePreview } = useDisclosure()

    const handleInputChange = (field, value) => {
        const temp = {...formData};
        temp[field] = value;
        setFormData({...temp});
    }

    const submit = () => {
        cb(setError, formData);
    }

    return(
        <>
        <Modal isOpen={isOpenPreview} onClose={onClosePreview}>
            <ModalOverlay />
            <ModalContent bg='palette.2'>
                <ModalHeader color='palette.1'>Preview</ModalHeader>
                <ModalCloseButton />
                <ModalBody p='20px'>
                    <Content content={formData.content} markdown={formData.markdown} math={formData.math}/>
                </ModalBody>
            </ModalContent>
        </Modal>
        <VStack w='100%' gap='0'>
            <Flex bg='palette.2' w='100%' 
            borderTopLeftRadius='10px' 
            borderTopRightRadius='10px' 
            align='center' 
            justify='space-between'
            p='3px 10px 3px 10px' 
            >
                <HStack w='100%'>
                    <Checkbox 
                    isChecked={formData.markdown}
                    onChange={() => handleInputChange('markdown', !formData.markdown)}
                    >
                        <Text color='palette.1'>
                            Markdown
                        </Text>
                    </Checkbox>
                    <Checkbox 
                    isChecked={formData.math}
                    onChange={() => handleInputChange('math', !formData.math)}
                    >
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
                        onClick={submit}
                    >
                        Send
                    </Button>
                </HStack>
            </Flex>
            <FormControl w='100%' isInvalid={error.length > 0}>
                <Textarea
                    placeholder={placeholder}
                    bg='palette.4'
                    border='none'
                    resize='none'
                    borderTopLeftRadius='0' 
                    borderTopRightRadius='0' 
                    h='150px'
                    color='palette.1'
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                />
                <FormErrorMessage>
                    {
                        error
                    }
                </FormErrorMessage>
            </FormControl>
        </VStack>
        </>
    )
}