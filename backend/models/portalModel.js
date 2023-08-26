const mongoose=require('mongoose');
const validator=require('validator');

const portalSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"]
    },
    designation:{
        type:String,
        required:[true,"Please enter your designation"]
    },
    profilePicture:{
        type:String,
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a Valid Email"]
    },
    contacts:[
        {
            phoneNo:{
                type:String,
                // required:[true,"Please enter your phone number"],
            },
            address:{
                type:String,
                // required:[true,"Please enter your address"]
            }
        }
    ],
    linkedIn:{
        type:String,
        // default:"",
        // required:[true,"Please enter your linkedIn profile"]
    },
    education:[{
        college:{
            type:String,
            // required:[true,"Please enter your college name"]
        },
        graduationYear:{
            type:Number,
            // required:[true,"Please enter your graduation year"]
        },
        cg:{
            type:Number,
            // required:[true,"Please enter your cgpa"]
        }
    }],
    skills:[{
        type:String
    }],
    experience:[{
        type:String
    }],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    }
})

module.exports=mongoose.model("Portal",portalSchema);