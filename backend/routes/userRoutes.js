import express from "express";
import User from "../models/User.js";

const router = express.Router();


// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const exist = await User.findOne({ email: req.body.email });

    if (exist) {
      return res.status(400).json("User Already Exists");
    }

    const user = new User(req.body);
    await user.save();

    res.json(user);

  } catch (err) {
    console.log(err);
    res.status(500).json("Register Error");
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password
    });

    if (!user) {
      return res.status(404).json("Invalid Credentials");
    }

    res.json(user);

  } catch (err) {
    console.log(err);
    res.status(500).json("Login Error");
  }
});


// ================= GET USER BY ID =================
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json("User Not Found");
    }

    res.json(user);

  } catch (err) {
    console.log(err);
    res.status(500).json("Get User Error");
  }
});


// ================= UPDATE PROFILE =================
router.put("/update/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(user);

  } catch (err) {
    console.log(err);
    res.status(500).json("Update Error");
  }
});

export default router;