import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Verify } from "./pages/Verify";
import { ResetPassword } from "./pages/ResetPassword";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { UpdateProfile } from "./pages/UpdateProfile";
import { ChangePassword } from "./pages/ChangePassword";
import { Users } from "./pages/Users";
import { Friends } from "./pages/Friends";
import { FriendRequests } from "./pages/FriendRequests";
import { Search } from "./pages/Search";
import { Chat } from "./pages/Chat";


export const App = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/verify' element={<Verify/>}/>
                <Route path='/reset-password' element={<ResetPassword/>}/>
                <Route path='/' element={<Home/>}/>
                <Route path='/search' element={<Search/>}/>
                <Route path='/profile/:id' element={<Profile/>}/>
                <Route path='/update' element={<UpdateProfile/>}/>
                <Route path='/change-password' element={<ChangePassword/>}/>
                <Route path='/users' element={<Users/>}/>
                <Route path='/friends' element={<Friends/>}/>
                <Route path='/friend-requests' element={<FriendRequests/>}/>
                <Route path='/chat' element={<Chat/>}/> 
            </Routes>
        </BrowserRouter>
    )
};
