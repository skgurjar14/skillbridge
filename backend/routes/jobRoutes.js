import express from "express";
import Job from "../models/job.js";
import User from "../models/User.js";

const router = express.Router();


// ================= POST JOB =================
router.post("/post", async (req, res) => {
  try {
    const job = new Job({
      ...req.body,
      appliedUsers: [],
      status: "open"
    });

    await job.save();
    res.json(job);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Post Job Error" });
  }
});


// ================= DELETE JOB =================
router.delete("/delete/:id", async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job Not Found" });
    }

    res.json({ message: "Deleted Successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Delete Error" });
  }
});


// ================= APPLY / CANCEL =================
router.post("/apply", async (req, res) => {
  try {
    const {
      jobId,
      applicantName,
      applicantEmail,
      applicantPhone,
      applicantId
    } = req.body;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job Not Found" });

    const existing = job.appliedUsers.find(u => u.userId === applicantId);

    // CANCEL
    if (existing) {
      job.appliedUsers = job.appliedUsers.filter(
        u => u.userId !== applicantId
      );

      await job.save();

      return res.json({ message: "Cancelled" });
    }

    // APPLY
    job.appliedUsers.push({
      userId: applicantId,
      name: applicantName,
      email: applicantEmail,
      phone: applicantPhone,
      status: "applied"
    });

    await job.save();

    res.json({ message: "Applied" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Apply Error" });
  }
});


// ================= ACCEPT =================
router.post("/accept", async (req, res) => {
  try {
    const { jobId, userId } = req.body;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job Not Found" });

    job.appliedUsers = job.appliedUsers.map(u =>
      u.userId === userId ? { ...u, status: "accepted" } : u
    );

    job.status = "accepted";

    await job.save();

    res.json({ message: "Accepted" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Accept Error" });
  }
});


// ================= START =================
router.post("/start", async (req, res) => {
  try {
    const { jobId, userId } = req.body;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job Not Found" });

    job.appliedUsers = job.appliedUsers.map(u =>
      u.userId === userId ? { ...u, status: "started" } : u
    );

    job.status = "started";

    await job.save();

    res.json({ message: "Started" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Start Error" });
  }
});


// ================= COMPLETE =================
router.post("/complete", async (req, res) => {
  try {
    const { jobId, userId } = req.body;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job Not Found" });

    job.appliedUsers = job.appliedUsers.map(u =>
      u.userId === userId ? { ...u, status: "completed" } : u
    );

    job.status = "completed";

    await job.save();

    res.json({ message: "Completed" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Complete Error" });
  }
});


// ================= GET ALL =================
router.get("/all", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Get Error" });
  }
});


// ================= NEARBY =================
router.post("/nearby", async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    const jobs = await Job.find();

    const nearby = jobs.filter(job => {
      if (!job.latitude || !job.longitude) return false;

      const d = Math.sqrt(
        Math.pow(latitude - job.latitude, 2) +
        Math.pow(longitude - job.longitude, 2)
      );

      return d < 0.5;
    });

    res.json(nearby);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Nearby Error" });
  }
});

export default router;