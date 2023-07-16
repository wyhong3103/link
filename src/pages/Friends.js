import { VStack } from "@chakra-ui/react"
import { Nav } from "../components/Nav"
import { UserList } from "../components/UserList"

export const Friends = () => {
    return(
        <VStack minH='100vh' bg='palette.4'>
            <Nav/>
            <UserList users={
                [
                    {
                        first_name : "Barry",
                        last_name : "Allen",
                        image : "https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg",
                        _id : "test",
                        isFriend : true
                    },
                    {
                        first_name : "Barry",
                        last_name : "Allen",
                        image : "https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg",
                        _id : "test",
                        isFriend : false
                    }
                ]
            }/>
        </VStack>
    )
}