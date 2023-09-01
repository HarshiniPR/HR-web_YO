const express=require('express');
const { getAllJobs, getJobDetails, postJob, updateJob, deleteJob } = require('../controllers/jobControllers');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth.js');

const router=express.Router();

router.get("/all/jobs",getAllJobs);
router.get("/jobs/:id",getJobDetails);
router.post("/employer/jobs/new",isAuthenticatedUser,postJob);
router.put("/employer/jobs/:id",isAuthenticatedUser,authorizeRoles("employer"),updateJob);
router.delete("/employer/jobs/:id",isAuthenticatedUser,authorizeRoles("employer"),deleteJob);

module.exports=router;