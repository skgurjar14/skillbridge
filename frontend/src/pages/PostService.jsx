import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/postservice.css";

function PostService(){

const navigate = useNavigate()

const user = JSON.parse(localStorage.getItem("user"))

const [title,setTitle]=useState("")
const [location,setLocation]=useState("")
const [price,setPrice]=useState("")
const [phone,setPhone]=useState("")
const [description,setDescription]=useState("")

// ✅ NEW
const [latitude,setLatitude]=useState(null)
const [longitude,setLongitude]=useState(null)


// ================= Get Location =================
useEffect(()=>{

navigator.geolocation.getCurrentPosition(

(position)=>{

setLatitude(position.coords.latitude)
setLongitude(position.coords.longitude)

},

()=>{
toast.warning("Location permission denied")
}

)

},[])



// ================= POST SERVICE =================
const postService = async()=>{

if(!user){
toast.warning("Please login first")
return
}

if(!title || !location || !price || !phone || !description){
toast.warning("Please fill all fields")
return
}

try{

await axios.post("http://localhost:5000/api/jobs/post",{

title,
location,
budget:price,
phone,
description,
postedBy:user.name,
email:user.email,
userId:user._id,

latitude,
longitude

})

toast.success("Service posted successfully 🚀")

navigate("/myservices")

}catch(err){

console.log(err)
toast.error("Failed to post service")

}

}



return(

<div className="post-container">

<div className="post-card">

<h2>Post Your Service</h2>

<input
placeholder="Service Title"
onChange={(e)=>setTitle(e.target.value)}
/>

<input
placeholder="Location"
onChange={(e)=>setLocation(e.target.value)}
/>

<input
placeholder="Price (₹)"
onChange={(e)=>setPrice(e.target.value)}
/>

<input
placeholder="Contact Number"
onChange={(e)=>setPhone(e.target.value)}
/>

<textarea
placeholder="Service Description"
onChange={(e)=>setDescription(e.target.value)}
></textarea>

<button onClick={postService}>
Post Service
</button>

</div>

</div>

)

}

export default PostService