import express from "express";
import job from "../models/job.js";
import nodemailer from "nodemailer";
import User from "../models/User.js";

const router = express.Router();


// ================= EMAIL =================
const transporter = nodemailer.createTransport({
service:"gmail",
auth:{
user:"sheshkarang@gmail.com",
pass:"risj apfv sytn rkcg"
}
});


// ================= POST JOB =================
router.post("/post", async (req, res) => {

try{

const job = new Job({
...req.body,
appliedUsers: []
})

await job.save()

res.json(job)

}catch(err){
console.log(err)
res.status(500).json("Post Job Error")
}

})

// ================= delete =================

router.delete("/delete/:id", async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json("Job Not Found");
    }

    res.json("Deleted Successfully");

  } catch (err) {
    console.log(err);
    res.status(500).json("Delete Error");
  }
});

// ================= APPLY / CANCEL =================
router.post("/apply", async(req,res)=>{

try{

const {
jobId,
applicantName,
applicantEmail,
applicantPhone,
applicantId
} = req.body

const job = await Job.findById(jobId)

if(!job) return res.status(404).json("Job Not Found")

const already = job.appliedUsers.find(
u => u.userId === applicantId
)


// -------- CANCEL ----------
if(already){

job.appliedUsers = job.appliedUsers.filter(
u => u.userId !== applicantId
)

await job.save()

return res.json("Cancelled")
}


// -------- APPLY ----------
job.appliedUsers.push({
userId: applicantId,
name: applicantName,
email: applicantEmail,
phone: applicantPhone,
status: "applied"
})

await job.save()

res.json("Applied")

}catch(err){
console.log(err)
res.status(500).json("Apply Error")
}

})



// ================= ACCEPT =================
router.post("/accept", async(req,res)=>{

try{

const {jobId,userId} = req.body

const job = await Job.findById(jobId)
if(!job) return res.status(404).json("Job Not Found")

job.appliedUsers = job.appliedUsers.map(u=>{
if(u.userId === userId){
u.status = "accepted"
}
return u
})

await job.save()

res.json("Accepted")

}catch(err){
console.log(err)
res.status(500).json("Accept Error")
}

})



// ================= START =================
router.post("/start", async(req,res)=>{

try{

const {jobId,userId} = req.body

const job = await Job.findById(jobId)
if(!job) return res.status(404).json("Job Not Found")

job.appliedUsers = job.appliedUsers.map(u=>{
if(u.userId === userId){
u.status = "started"
}
return u
})

await job.save()

res.json("Started")

}catch(err){
res.status(500).json("Start Error")
}

})



// ================= COMPLETE =================
router.post("/complete", async(req,res)=>{

try{

const {jobId,userId} = req.body

const job = await Job.findById(jobId)
if(!job) return res.status(404).json("Job Not Found")

job.appliedUsers = job.appliedUsers.map(u=>{
if(u.userId === userId){
u.status = "completed"
}
return u
})

await job.save()

res.json("Completed")

}catch(err){
res.status(500).json("Complete Error")
}

})



// ================= RATE =================
router.post("/rate", async(req,res)=>{

try{

const {userId,rating,review} = req.body

const user = await User.findById(userId)
if(!user) return res.status(404).json("User Not Found")

if(!user.ratings) user.ratings = []

user.ratings.push({rating,review})

// avg
const total = user.ratings.reduce((sum,r)=>sum + Number(r.rating),0)
user.avgRating = total / user.ratings.length

await user.save()

res.json("Rated")

}catch(err){
res.status(500).json("Rating Error")
}

})



// ================= GET ALL =================
router.get("/all", async(req,res)=>{

try{

const jobs = await Job.find().sort({createdAt:-1})

res.json(jobs)

}catch(err){
res.status(500).json("Get Error")
}

})



// ================= NEARBY =================
router.post("/nearby", async(req,res)=>{

try{

const {latitude,longitude} = req.body

const jobs = await Job.find()

const nearby = jobs.filter(job=>{

if(!job.latitude || !job.longitude) return false

const d = Math.sqrt(
Math.pow(latitude - job.latitude,2) +
Math.pow(longitude - job.longitude,2)
)

return d < 0.5
})

res.json(nearby)

}catch(err){
res.status(500).json("Nearby Error")
}

})

export default router;