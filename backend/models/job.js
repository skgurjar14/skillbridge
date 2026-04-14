import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({

title:{
type:String,
required:true
},

location:{
type:String,
required:true
},

budget:{
type:String,
required:true
},

phone:{
type:String,
required:true
},

description:{
type:String
},

postedBy:{
type:String,
required:true
},

email:{
type:String,
required:true
},

userId:{
type:String,
required:true
},


// 🔥 Service Status

status:{
type:String,
default:"open"
// open
// accepted
// started
// completed
},


// 🔥 Applied Users

appliedUsers:[
{
userId:String,
email:String,
name:String,
phone:String,

status:{
type:String,
default:"applied"

// applied
// accepted
// started
// completed

}

}
],

latitude:Number,
longitude:Number

},{timestamps:true});

export default mongoose.model("Job", JobSchema);