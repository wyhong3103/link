import { convertDateTime } from "../../util/util";
import { Content } from "../Content"
import { Flex, Image, Text, Link, VStack, Box } from '@chakra-ui/react'

export const Comment = ({comment}) => {
    const api_url = process.env.REACT_APP_API_URL;
    const anonymousImage = `${api_url}/images/anonymous.jpg`;
    return(
        <>
            <Flex direction='row' w='100%' gap='20px'>
                <Box>
                    <Image src={`${comment.author.image}` || anonymousImage} w='50px' objectFit='cover' borderRadius='100%'/>
                </Box>
                <VStack w='100%'> 
                    <Flex direction='row' w='100%'>
                        <Link color='palette.1'>
                            {`${comment.author.first_name} ${comment.author.last_name}` }
                        </Link>
                        <Text color='palette.1'>
                            , {convertDateTime(comment.date)}
                        </Text>
                    </Flex>
                    <Content content={comment.content} markdown={comment.markdown} math={comment.math}/>
                </VStack>
            </Flex>
        </>
    )
}