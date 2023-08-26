const express=require('express');
const { isAuthenciatedUser, authorizeRoles } = require('../middlewares/auth.js');
const { createMeeting, deleteMeeting, updateMeeting } = require('../controllers/meetingController.js');

const router=express.Router();

router.post("/meeting/new",createMeeting);
router.delete("/meeting/delete/:id",deleteMeeting);
router.put("/meeting/update/:id",updateMeeting);

module.exports=router;