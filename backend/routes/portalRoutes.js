const express=require('express');
const { createPortal, deletePortal, updatePortal, getUserPortal } = require('../controllers/portalController');
const { isAuthenciatedUser } = require('../middlewares/auth');

const router=express.Router();

router.post("/portal/new",isAuthenciatedUser,createPortal);
router.delete("/portal/delete/:id",deletePortal);
router.put("/portal/edit/:id",updatePortal);
router.get("/portal/me",isAuthenciatedUser,getUserPortal);

module.exports=router;