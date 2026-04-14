import job from "../models/job"

export const postJob = async(req,res)=>{

const job = new Job(req.body)

await job.save()

res.json(job)

}

export const getJobs = async(req,res)=>{

const jobs = await Job.find()

res.json(jobs)

}