import { NarrowNav } from "./Nav/NarrowNav"
import { WideNav } from "./Nav/WideNav"
import { useBreakpointValue } from "@chakra-ui/react";


export const Nav = () => {
    const isMobile = useBreakpointValue({ base: true, lg: false });
  
    return (
      <>
        {
            isMobile ? 
            <NarrowNav/>
            :
            <WideNav/>
        }
      </>
    );
}