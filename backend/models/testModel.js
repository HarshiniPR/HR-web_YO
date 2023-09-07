const mongoose=require('mongoose');

const testSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"Please enter your first name"]
    },
    lastName:{
        type:String,
        required:[true,"Please enter your last name"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"]
    },
    college:{
        type:String,
        required:[true,"Please enter your college name"]
    },
    eduction:{
        type:String,
        required:[true,"Please enter your education"]
    },
    graduationYear:{
        type:String,
        required:[true,"Please enter your graduation year"]
    },
    experience:{
        type:Number,
        required:[true,"Please enter your erperience"]
    },
    phoneNo:{
        type:Number,
        required:[true,"Please enter your phone number"],
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },score:{
        type:Number,
        default:0
    }
})

module.exports=mongoose.model("Test",testSchema)