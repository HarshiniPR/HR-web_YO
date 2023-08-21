const mongoose=require('mongoose');

const meetingSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please enter the title"]
    },
    date:{
        type:String,
        required:[true,"Please enter the date"],
    },
    time:{
        type: String,
        required:[true,"Please enter the time"]
    }
})

module.exports=mongoose.model("Meeting",meetingSchema);