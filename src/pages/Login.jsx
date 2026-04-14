import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/form.css";

function Login(){

const navigate = useNavigate()

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const login = async()=>{

if(!email || !password){
toast.warning("Please fill all fields")
return
}

try{

toast.info("Logging in...")

const res = await axios.post(
"http://localhost:5000/api/users/login",
{
email,
password
}
)

const userData = res.data.user || res.data

localStorage.setItem("user",JSON.stringify(userData))

window.dispatchEvent(new Event("storage"))

toast.success("Login successful 🎉")

navigate("/")

}catch(err){

toast.error("Invalid credentials")

console.log(err)

}

}

return(

<div className="form-container">

<h2>Login</h2>

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={login}>
Login
</button>

</div>

)

}

export default Login