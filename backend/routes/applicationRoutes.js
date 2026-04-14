import express from "express"
import Application from "../models/application"

const router = express.Router()

router.post("/apply", async(req,res)=>{

const app = new Application(req.body)

await app.save()

res.json(app)

})

router.get("/my", async(req,res)=>{

const apps = await Application.find()

res.json(apps)

})

export default router