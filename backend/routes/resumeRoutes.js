const express=require('express');
const { isAuthenticatedUser } = require('../middlewares/auth.js');
const { getAllResume, getResumeDetails, createResume, updateResume, deleteResume } = require('../controllers/resumeController.js');

const router=express.Router();

router.get("/all/resumes",getAllResume);
router.get("/resuem/:id",getResumeDetails);
router.post("/resume/new",isAuthenticatedUser,createResume);
router.put("/resume/:id",isAuthenticatedUser,updateResume);
router.delete("/resume/:id",isAuthenticatedUser,deleteResume);

module.exports=router;