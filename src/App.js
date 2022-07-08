import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Reset from "./pages/resetPassword/Reset";
import Update from "./pages/updateProfile/Update";
import Messanger from "./pages/Messanger/Messanger";
import {Flasher} from "react-universal-flash";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
     <Flasher position="custom" />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route  exact path="/profile/:id/:username" element={<Profile/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/reset-password" element={<Reset/>}/>
        <Route exact path="/:id/:username/update-profile" element={<Update/>}/>
        <Route exact path="/messanger" element={<Messanger/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
