import Home from "./Pages/home/home";
import Login from "./Pages/login/login";
import Profile from "./Pages/profile/profile";
import Register from "./Pages/register/register";
import Notification from "./Notification/notification"
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);
  return (<>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={currentUser ? <Home /> : <Register />} />
        <Route path="/login" element={currentUser ?<Home/> : <Login />} />
        <Route path="/register" element={currentUser ? <Navigate to="/" /> : <Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
    <Notification/>
  </>
  );
}

export default App;
