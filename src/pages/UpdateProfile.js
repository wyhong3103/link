import { Nav } from "../components/Nav"
import { 
    Flex, 
    VStack,
    Spinner, 
    Text,
    Image,
    Heading,
    Checkbox,
    Button,
    Input,
    FormLabel,
    FormControl,
    FormErrorMessage
} from "@chakra-ui/react"
import { useEffect, useState, useRef } from "react"
import { useErrorBoundary } from "react-error-boundary"
import useAuth from "../hooks/useAuth"

export const UpdateProfile = () => {
    // first name, last name, image

    /*
    
    display image (if image is checked)
    priority
    1. if file uploaded, display uploaded file
    2. check if user.image has any image
    3. anonymous url

    */
    const fileInputRef = useRef(null);
    const [ self ] = useAuth();
    const { showBoundary } = useErrorBoundary();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({
        _id : '',
        first_name : '',
        last_name : '',
        image : ''
    });
    const [imageChecked, setImageChecked] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [name, setName] = useState(
        {
            first_name : '',
            last_name : '',
        }
    )
    const [error, setError] = useState(
        {
            first_name : '',
            last_name : '',
            delete_image : '',
            result : ''
        }
    )
    const api_url = process.env.REACT_APP_API_URL;
    const anonymousImage = `${api_url}/images/anonymous.jpg`;

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleNameChange = (field, value) => {
        const temp = {...name};
        temp[field] = value;
        setName({...temp});
    }

    const fetchInfo = async () => {
        const res = await fetch(
            api_url + `/user/${self.userid}`,
            {
                credentials : 'include'
            }
        );

        const data = await res.json();

        if (!res.ok){
            const error = new Error(data.error.result);
            error.status = res.status;
            error.isLogged = true;
            showBoundary(error);
            return;
        }
        setImageChecked(!!data.user.image)
        setName({
            first_name : data.user.first_name,
            last_name : data.user.last_name
        })
        setUser({...data.user});
    }

    const update = async () => {
        const formData = new FormData();
        
        if (imageChecked) formData.append('image', selectedFile);
        formData.append('first_name', name.first_name);
        formData.append('last_name', name.last_name);
        formData.append('delete_image', !imageChecked);

        const res = await fetch(
            api_url + `/user/${self.userid}`,
            {
                method: 'PUT',
                credentials : 'include',
                body: formData
            }
        );
        
        const data = await res.json();

        if (res.ok){
            fetchInfo();
        } else if (res.status <= 402){
            setError(data.error);
        } else {
            const error = new Error(data.error.result);
            error.status = res.status;
            error.isLogged = true;
            showBoundary(error);
        }
    }

    const enterSubmit = (event) => {
        if (event.keyCode === 13) {
            update();
        }
    };

    useEffect(
        () => {
            (async () => {
                if (self){
                    await fetchInfo();
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
            <Nav last_name={self.last_name} id={self.userid}/>
            <VStack bg='palette.3' p='30px' borderRadius='10px' gap='20px' w='300px' margin='20px'> 
                <Heading color='palette.1' fontSize='25px'>
                    Update Profile
                </Heading>
                <Image 
                src={
                    (imageChecked ? 
                        (selectedFile ? URL.createObjectURL(selectedFile) : ((user.image && api_url + user.image) || anonymousImage))
                         : 
                         anonymousImage 
                    )
                }
                alt='avatar'
                w='200px'
                h='200px'
                objectFit='cover'
                borderRadius='100%'
                />

                <VStack w='100%' gap='20px'>
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
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                                textAlign='center'
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
                    <FormControl w='100%' isInvalid={error.delete_image && error.delete_image.length > 0}>
                        <FormErrorMessage textAlign='center' w='100%'>
                            {error.delete_image}
                        </FormErrorMessage>
                    </FormControl>
                </VStack>



                <FormControl w='100%' isInvalid={error.first_name && error.first_name.length > 0}>
                    <FormLabel color='palette.1' w='100%'>
                        First Name
                    </FormLabel>
                    <Input
                        type="text"
                        placeholder="Enter your first name"
                        bg='palette.2'
                        style={{
                            "border" : "none"
                        }}
                        w='100%'
                        color='palette.1'
                        value={name.first_name}
                        onChange={(e) => handleNameChange('first_name', e.target.value)}
                        onKeyDown={enterSubmit}
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
                        type="text"
                        placeholder="Enter your last name"
                        bg='palette.2'
                        style={{
                            "border" : "none"
                        }}
                        w='100%'
                        color='palette.1'
                        value={name.last_name}
                        onChange={(e) => handleNameChange('last_name', e.target.value)}
                        onKeyDown={enterSubmit}
                    />
                    <FormErrorMessage>
                        {error.last_name}
                    </FormErrorMessage>
                </FormControl>



                <Button bg='palette.4' minW='100%'
                    css={{
                        '&:hover': {
                            backgroundColor: '#11999E',
                        },
                        '&:active': {
                            backgroundColor: '#11999E',
                        },
                    }}
                    onClick={update}
                >
                    <Text color='palette.1'>Update</Text>
                </Button>
            </VStack>
        </VStack>
    )
}