const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const crypto=require('crypto')

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required: [true,"Please enter Your First Name"],
        maxLength:[30,"Cannot Exceed 30 characters"],
        minLength:[2,"Name should not have less than 2 characters"]
    },
    lastName:{
        type:String,
        required: [true,"Please enter Your Last Name"],
        maxLength:[30,"Cannot Exceed 30 characters"],
        minLength:[2,"Name should have less than 2 characters"]
    },
    email:{
        type:String,
        required: [true,"Please enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a Valid Email"]
    },
    password:{
        type:String,
        required: [true,"Please enter Your Password"],
        minLength:[3,"Password should have more than 3 characters"],
        select:false
    },
    confirmPassword:{
        type:String,
        select:false
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
})

userSchema.pre("save",async function(next){ 
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10)
})

userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,       //Provide date after which it should expire such as 5d.
    });
}

userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

userSchema.methods.getResetPasswordToken=function(){

    const resetToken=crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire=Date.now()+15*60*1000;

    return resetToken;
}

module.exports=mongoose.model("User",userSchema);