const express=require('express');
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser,getSingleUser } = require('../controllers/userController.js');
const { isAuthenticatedUser,authorizeRoles } = require('../middlewares/auth.js');


const router=express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout",isAuthenticatedUser,logout);
router.post("/password/forgot",forgotPassword);
router.put("/password/reset/:token",resetPassword);
router.put("/password/update",isAuthenticatedUser,updatePassword);
router.get("/me",isAuthenticatedUser,getUserDetails);
router.put("/me/update",isAuthenticatedUser,updateProfile);

router.get("/employer/users",isAuthenticatedUser,authorizeRoles("employer"),getAllUser)
router.get("/employer/user/:id",isAuthenticatedUser,authorizeRoles("employer"),getSingleUser)

module.exports=router;