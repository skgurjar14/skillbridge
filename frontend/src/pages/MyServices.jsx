import axios from "axios"
import {useEffect,useState} from "react"
import { toast } from "react-toastify"
import JobCard from "../components/Jobcard"
import "../styles/home.css"

function MyServices(){

const user = JSON.parse(localStorage.getItem("user"))

const [jobs,setJobs] = useState([])
const [selectedJob,setSelectedJob] = useState(null)


// ================= Load My Jobs =================

const loadMyJobs = async()=>{

try{

const res = await axios.get(
"https://skillbridge-p3p8.onrender.com"
)

const myJobs = res.data
.filter(job => job.userId === user?._id)
.map(job=>({
...job,
status: job.status || "open"
}))

setJobs(myJobs)

}catch(err){

toast.error("Failed to load services")

}

}

useEffect(()=>{
loadMyJobs()
},[])


// ================= Accept User =================

const acceptUser = async(job,userId)=>{

try{

await axios.post(
"http://localhost:5000/api/jobs/accept",
{
jobId:job._id,
userId
}
)

toast.success("Applicant accepted")

loadMyJobs()

}catch(err){

toast.error("Failed to accept applicant")

}

}



// ================= Start Work =================

const startWork = async(job,userId)=>{

try{

await axios.post(
"http://localhost:5000/api/jobs/start",
{
jobId:job._id,
userId
}
)

toast.info("Work started")

loadMyJobs()

}catch(err){

toast.error("Failed to start work")

}

}



// ================= Complete Work =================

const completeWork = async(job,userId)=>{

try{

await axios.post(
"http://localhost:5000/api/jobs/complete",
{
jobId:job._id,
userId
}
)

toast.success("Work completed 🎉")

loadMyJobs()

}catch(err){

toast.error("Failed to complete work")

}

}



return(

<div>

<h2 style={{textAlign:"center"}}>
My Services
</h2>

<div className="jobs">

{jobs.map((job,index)=>(

<div key={index}>

<JobCard 
job={job} 
showDelete={true}
/>


{/* Applicants Section */}

<div className="applicants">

<button
className="view-btn"
onClick={()=>setSelectedJob(
selectedJob === job._id ? null : job._id
)}
>
👥 Applicants ({job.appliedUsers?.length || 0})
</button>


{selectedJob === job._id && (

<div className="applicant-list">

{job.appliedUsers?.length === 0 && (
<p>No Applicants Yet</p>
)}


{job.appliedUsers?.map((applicant,index)=>(

<div 
key={index}
className="applicant-card"
>

<p><b>Name:</b> {applicant.name}</p>

<p><b>Email:</b> {applicant.email}</p>

<p><b>Phone:</b> {applicant.phone}</p>

<p>
<b>Status:</b> {applicant.status || "Applied"}
</p>


{/* Accept */}

{(!applicant.status || applicant.status === "applied") && (

<button
className="apply-btn"
onClick={()=>acceptUser(job,applicant.userId)}
>
Accept
</button>

)}


{/* Start */}

{applicant.status === "accepted" && (

<button
className="start-btn"
onClick={()=>startWork(job,applicant.userId)}
>
Start Work
</button>

)}


{/* Complete */}

{applicant.status === "started" && (

<button
className="complete-btn"
onClick={()=>completeWork(job,applicant.userId)}
>
Complete
</button>

)}


{applicant.status === "completed" && (

<p className="completed">
✅ Completed
</p>

)}


</div>

))}

</div>

)}

</div>

</div>

))}

</div>

</div>

)

}

export default MyServices