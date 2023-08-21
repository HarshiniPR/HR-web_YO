const multer=require('multer')

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})

const fileFilter=(req,file,cb)=>{
    //only image and pdf file allowed
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png' || file.mimetype==='application/pdf'){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}

const upload=multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*5
    },
    fileFilter:fileFilter
})

module.exports=upload;
