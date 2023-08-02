const express=require('express');
const { isAuthenciatedUser, authorizeRoles } = require('../middlewares/auth.js');
const { getAllResume, getResumeDetails, createResume, updateResume, deleteResume } = require('../controllers/resumeController.js');

const router=express.Router();

router.get("/all/resumes",getAllResume);
router.get("/resuem/:id",getResumeDetails);
router.post("/user/resume/new",isAuthenciatedUser,authorizeRoles("user"),createResume);
router.put("/user/resume/:id",isAuthenciatedUser,authorizeRoles("uesr"),updateResume);
router.delete("/user/resume/:id",isAuthenciatedUser,authorizeRoles("user"),deleteResume);

module.exports=router;