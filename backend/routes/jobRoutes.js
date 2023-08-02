const express=require('express');
const { getAllJobs, getJobDetails, postJob, updateJob, deleteJob } = require('../controllers/jobControllers');
const { isAuthenciatedUser, authorizeRoles } = require('../middlewares/auth.js');

const router=express.Router();

router.get("/all/jobs",getAllJobs);
router.get("/jobs/:id",getJobDetails);
router.post("/employer/jobs/new",isAuthenciatedUser,authorizeRoles("employer"),postJob);
router.put("/employer/jobs/:id",isAuthenciatedUser,authorizeRoles("employer"),updateJob);
router.delete("/employer/jobs/:id",isAuthenciatedUser,authorizeRoles("employer"),deleteJob);

module.exports=router;