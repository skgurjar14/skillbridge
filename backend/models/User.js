import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    default: ""
  },

  skill: {
    type: String,
    default: ""
  },

  location: {
    type: String,
    default: ""
  },

  ratings: [
    {
      userId: String,
      rating: Number,
      review: String
    }
  ],

  avgRating: {
    type: Number,
    default: 0
  }
},
{ timestamps: true }
);

export default mongoose.model("User", UserSchema);