const mongoose=require('mongoose')

const resumeSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required: [true,"Please enter Your First Name"],
        trim:true
    },
    middleName:{
        type:String,
        trim:true
    },
    lastName:{
        type:String,
        required: [true,"Please enter Your Last Name"],
        trim:true
    },
    image:{
        type:String
    },
    designation:{
        type:String,
    },
    address:{
        type:String,
    },
    email:{
        type:String,
        required: [true,"Please enter Your Email"],
    },
    phoneNo:{
        type:Number,
        required: [true,"Please enter Your Phone Number"],
        minLength:[10,'Enter valid phone number'],
        maxLength:[10,'Enter valid phone number']
    },
    summary:{
        type:String
    },
    achievements:[{
        title:{
            type:String
        },
        description:{
            type:String
        }
    }],
    experience:[{
        title:{
            type:String
        },
        company:{
            type:String
        },
        location:{
            type:String
        },
        startDate:{
            type:Date,
        },
        endDate:{
            type:Date,
        },
        description:{
            type:String
        }
    }],
    education:[{
        school:{
            type:String
        },
        degree:{
            type:String
        },
        city:{
            type:String
        },
        startDate:{
            type:Date,
        },
        endDate:{
            type:Date,
        },
        description:{
            type:String
        }
    }],
    projects:[{
        name:{
            type: String
        },
        link:{
            type: String
        },
        description:{
            type: String
        }
    }],
    skills:[{
        skill:{
            type:String
        }
    }],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("Resume",resumeSchema);