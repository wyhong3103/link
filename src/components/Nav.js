import { NarrowNav } from "./Nav/NarrowNav"
import { WideNav } from "./Nav/WideNav"
import { useBreakpointValue } from "@chakra-ui/react";


export const Nav = ({last_name, id, fetchUsers}) => {
    const isMobile = useBreakpointValue({ base: true, lg: false });
  
    return (
      <>
        {
            isMobile ? 
            <NarrowNav id={id} fetchUsers={fetchUsers}/>
            :
            <WideNav last_name={last_name} id={id} fetchUsers={fetchUsers}/>
        }
      </>
    );
}