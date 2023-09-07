const express=require('express');
const { createPortal, deletePortal, updatePortal, getUserPortal } = require('../controllers/portalController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router=express.Router();

router.post("/portal/new",createPortal);
router.delete("/portal/delete/:id",deletePortal);
router.put("/portal/edit/:id",updatePortal);
router.get("/portal/me",isAuthenticatedUser,getUserPortal);

module.exports=router;