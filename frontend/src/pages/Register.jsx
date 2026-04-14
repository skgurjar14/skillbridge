import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/form.css";

function Register() {

const navigate = useNavigate()

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [phone,setPhone] = useState("")
const [skill,setSkill] = useState("")
const [location,setLocation] = useState("")

const register = async () => {

if(!name || !email || !password){
toast.warning("Please fill required fields")
return
}

try{

toast.info("Creating account...")

const res = await axios.post(
"https://skillbridge-p3p8.onrender.com",
{
name,
email,
password,
phone,
skill,
location
}
)

if(res.data){

const userData = res.data.user || res.data

localStorage.setItem("user", JSON.stringify(userData))

window.dispatchEvent(new Event("storage"))

toast.success("Account created successfully 🎉")

navigate("/")

}

}catch(err){

toast.error("User already exists")
console.log(err)

}

}

return(

<div className="form-container">

<h2>Create Account</h2>

<input
placeholder="Full Name"
onChange={(e)=>setName(e.target.value)}
/>

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<input
placeholder="Phone (Optional)"
onChange={(e)=>setPhone(e.target.value)}
/>

<input
placeholder="Your Skill (Optional)"
onChange={(e)=>setSkill(e.target.value)}
/>

<input
placeholder="Location (Optional)"
onChange={(e)=>setLocation(e.target.value)}
/>

<button onClick={register}>
Create Account
</button>

</div>

)

}

export default Register