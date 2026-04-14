import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    location: { type: String, required: true },

    budget: { type: String, default: "0" },

    phone: { type: String, default: "Not Provided" },

    description: { type: String },

    postedBy: { type: String, required: true },

    email: { type: String, required: true },

    userId: { type: String, required: true },

    status: {
      type: String,
      default: "open",
    },

    appliedUsers: [
      {
        userId: String,
        email: String,
        name: String,
        phone: String,
        status: { type: String, default: "applied" },
      },
    ],

    latitude: Number,
    longitude: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);