import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import PostService from "./pages/PostService"
import MyServices from "./pages/MyServices"
import Profile from "./pages/Profile"
import About from "./pages/About"
import SkillBridgeFooter from "./components/SkillBridgeFooter"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App(){

return(

<BrowserRouter>

<Navbar/>

<Routes>

<Route path="/" element={<Home/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>
<Route path="/postservice" element={<PostService/>}/>
<Route path="/myservices" element={<MyServices />} />
<Route path="/profile" element={<Profile/>}/>
<Route path="/about" element={<About/>}/>

</Routes>

{/* Footer Always Bottom */}
<SkillBridgeFooter/>

{/* Toast Notification */}
<ToastContainer 
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={true}
closeOnClick
pauseOnHover
theme="colored"
/>

</BrowserRouter>

)

}

export default App