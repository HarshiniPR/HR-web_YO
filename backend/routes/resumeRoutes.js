const express=require('express');
const { isAuthenciatedUser, authorizeRoles } = require('../middlewares/auth.js');
const { getAllResume, getResumeDetails, createResume, updateResume, deleteResume } = require('../controllers/resumeController.js');

const router=express.Router();

router.get("/all/resumes",getAllResume);
router.get("/resuem/:id",getResumeDetails);
router.post("/resume/new",isAuthenciatedUser,createResume);
router.put("/resume/:id",isAuthenciatedUser,updateResume);
router.delete("/resume/:id",isAuthenciatedUser,deleteResume);

module.exports=router;