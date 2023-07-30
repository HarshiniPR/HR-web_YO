const express=require('express');
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser,getSingleUser } = require('../controllers/userController.js');
const { isAuthenciatedUser,authorizeRoles } = require('../middlewares/auth.js');


const router=express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout",isAuthenciatedUser,logout);
router.post("/password/forgot",forgotPassword);
router.put("/password/reset/:token",resetPassword);
router.put("/password/update",isAuthenciatedUser,updatePassword);
router.get("/me",isAuthenciatedUser,getUserDetails);
router.put("/me/update",isAuthenciatedUser,updateProfile);

router.get("/employer/users",isAuthenciatedUser,authorizeRoles("employer"),getAllUser)
router.get("/employer/user/:id",isAuthenciatedUser,authorizeRoles("employer"),getSingleUser)

module.exports=router;