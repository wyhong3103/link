import { VStack, Image, Button, Input, Text, Checkbox, Heading } from "@chakra-ui/react"
import { useRef, useState } from "react";
import { Nav } from "../components/Nav"

export const UpdateProfile = () => {
    const [imageChecked, setImageChecked] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    // first name, last name, image

    /*
    
    display image (if image is checked)
    priority
    1. if file uploaded, display uploaded file
    2. check if user.image has any image
    3. anonymous url

    */

    return(
        <VStack minH='100vh' bg='palette.4'>
            <Nav/>
            <VStack bg='palette.3' p='30px' borderRadius='10px' gap='20px' w='300px' margin='20px'> 
                <Heading color='palette.1' fontSize='25px'>
                    Update Profile
                </Heading>
                <Image 
                src='https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg' 
                alt='avatar'
                w='200px'
                borderRadius='100%'
                />

                <VStack w='100%'>
                    <Checkbox 
                        isChecked={imageChecked}
                        onChange={() => setImageChecked(!imageChecked)}
                    > 
                        <Text color='palette.1'>
                            Profile Picture
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
                                w='250px'
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
                                onClick={() => fileInputRef.current.click()}
                                color='palette.1'
                                w='100%'
                            >
                                Upload
                            </Button>
                        </>

                        :

                        null
                    }
                </VStack>

                <VStack w='100%'>
                    <Text color='palette.1' align='left' w='100%'>
                        First Name
                    </Text>
                    <Input
                        type="text"
                        placeholder="Enter your first name"
                        bg='palette.2'
                        style={{
                            "border" : "none"
                        }}
                        w='100%'
                        color='palette.1'
                    />
                </VStack>

                <VStack w='100%'>
                    <Text color='palette.1' align='left' w='100%'>
                        Last Name
                    </Text>
                    <Input
                        type="text"
                        placeholder="Enter your last name"
                        bg='palette.2'
                        style={{
                            "border" : "none"
                        }}
                        w='100%'
                        color='palette.1'
                    />
                </VStack>

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
                    <Text color='palette.1'>Update</Text>
                </Button>
            </VStack>
        </VStack>
    )
}