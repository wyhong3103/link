import { Nav } from "../components/Nav"
import { UserList } from "../components/UserList"
import { 
    VStack, 
    Text 
} from "@chakra-ui/react"

export const Search = () => {
    return(
        <VStack minH='100vh' bg='palette.4'>
            <Nav/>
            <Text color='palette.1' margin='20px'>
                Search result is sorted by relevancy
            </Text>
            <UserList users={
                [
                    {
                        first_name : "Barry",
                        last_name : "Allen",
                        image : "https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg",
                        _id : "test",
                        type : 'accept'
                    },
                    {
                        first_name : "Barry",
                        last_name : "Allen",
                        image : "https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg",
                        _id : "test",
                        type : 'accept'
                    }
                ]
            }/>
        </VStack>
    )
}