const mongoose=require('mongoose');

const jobSchema=new mongoose.Schema({
    companyName:{
        type:String,
        required:[true,"Please enter your company's name"]
    },
    companyEmail:{
        type:String,
        required:[true,"Please enter your company's official Email"]
    },
    noOfEmployees:{
        type:Number
    },
    name:{
        type:String,
        required:[true,"Please enter your name"]
    },
    phoneNo:{
        type:Number,
        required:[true,"Please enter your phone number"],
        minLength:[10,"Please enter a valid number"]
    },
    jobTitle:{
        type:String,
        required:[true,"Please enter Job Title"]
    },
    industry:{
        type:String,
        required:[true,"Please enter your industry"]
    },
    description:{
        type:String
    },
    employementType:{
        type:String,
        enum:["full-time","part-time","internship","job","project-work"],
        required:[true,"Select employement type"],
        default:"remote"
    },
    jobType:{
        type:String,
        enum:["on-site","remote"],
        required:[true,"Select job type"],
        default:"remote"
    }
})

module.exports=mongoose.model("Job",jobSchema)