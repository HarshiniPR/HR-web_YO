const express=require('express');
const { isAuthenticatedUser } = require('../middlewares/auth');
const { newTest, getTestDetails, getAllTests } = require('../controllers/testControllers');

const router=express.Router();

router.post("/new/test",isAuthenticatedUser,newTest);
router.get("/get/test/:id",isAuthenticatedUser,getTestDetails);
router.get("/get/test/all",isAuthenticatedUser,getAllTests);

module.exports=router;