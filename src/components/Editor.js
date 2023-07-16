import { Flex, Textarea, Checkbox, HStack, VStack, Text, Button, Image  } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react'
import { Content } from './Content';
import { ReactComponent as DotsLogo } from '../assets/svgs/dots.svg';
import { useState, useRef } from 'react';

export const Editor = () => {
    const [imageChecked, setImageChecked] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const { isOpen : isOpenOptions, onOpen : onOpenOptions, onClose : onCloseOptions } = useDisclosure()
    const { isOpen : isOpenPreview, onOpen : onOpenPreview, onClose : onClosePreview } = useDisclosure()

    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };


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
        <Modal isOpen={isOpenOptions} onClose={onCloseOptions}>
            <ModalOverlay />
            <ModalContent bg='palette.2' w='300px'>
                <ModalHeader color='palette.1'>Options</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex p='10px' gap='20px' w='100%' direction='column'>
                    <Checkbox border='none'>
                        <Text color='palette.1'>
                            Markdown
                        </Text>
                    </Checkbox>
                    <Checkbox c>
                        <Text color='palette.1'>
                            LaTeX
                        </Text>
                    </Checkbox>
                    <Checkbox 
                        isChecked={imageChecked}
                        onChange={() => setImageChecked(!imageChecked)}
                    > 
                        <Text color='palette.1'>
                            Image
                        </Text>
                    </Checkbox>
                    {
                        imageChecked ? 
                        
                        <>
                            <input
                                ref={fileInputRef}
                                type="file"
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                            <Text color='palette.1'
                                style={{
                                    'white-space': 'nowrap',
                                    'overflow': 'hidden',
                                    'text-overflow': 'ellipsis',
                                }}
                            >
                                {selectedFile ? selectedFile.name : null}
                            </Text>
                            <Button bg='palette.4'
                                css={{
                                    '&:hover': {
                                        backgroundColor: '#11999E',
                                    },
                                    '&:active': {
                                        backgroundColor: '#11999E',
                                    },
                                }}
                                p='3px 10px 3px 10px'
                                onClick={() => fileInputRef.current.click()}
                                color='palette.1'
                                size='sm'
                                w='100%'
                            >
                                Upload
                            </Button>
                        </>

                        :

                        null
                    }
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
        <VStack w='100%' gap='0'>
            <Textarea
                placeholder='Write a post.'
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
            direction='row'
            p='3px 10px 3px 10px' 
            h='50px'
            >

                <Button
                    bg='none'
                    css={{
                        '&:hover': {
                            backgroundColor: '#222831',
                        },
                        '&:active': {
                            backgroundColor: '#222831',
                        },
                    }}
                    p='15px'
                    onClick={onOpenOptions}
                >
                    <Image as={DotsLogo} alt='dots-logo' width='25px' h='25px'/>
                </Button> 
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