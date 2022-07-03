import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/profile/:username" element={<Profile/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
