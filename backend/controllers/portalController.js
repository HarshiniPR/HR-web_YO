const Portal=require("../models/portalModel.js");
const catchAsyncErrors = require('../middlewares/catchAsyncError.js');
const cloudinary=require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});



exports.createPortal = catchAsyncErrors(async (req, res, next) => {
    try {
        let profilePictureUrl = null;

        if (req.files && req.files.profilePicture) {
            const profilePictureFile = req.files.profilePicture;

            const uploadResult = await cloudinary.uploader.upload(profilePictureFile.tempFilePath, {
                folder: "Portal Pictures"
            });

            profilePictureUrl = uploadResult.url;
        }

        const {
            name,
            designation,
            contacts,
            email,
            linkedIn,
            education,
            skills,
            experience
        } = req.body;

        const contactsArray = contacts ? JSON.parse(contacts) : [];
        const educationArray = education ? JSON.parse(education) : [];

        const portalData = {
            name,
            email,
            designation,
            contacts: contactsArray,
            profilePicture: profilePictureUrl,
            user: req.user.id,
            linkedIn,
            education: educationArray,
            skills,
            experience
        };

        const portal = await Portal.create(portalData);

        res.status(201).json({
            success: true,
            portal
        });
    } catch (error) {
        console.error("Error creating portal:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while creating the portal."
        });
    }
});


exports.getUserPortal = catchAsyncErrors(async (req, res, next) => {
    const portal = await Portal.findById(req.params.id);

    if (!portal) {
        res.status(500).json({
            success: false,
            message: "Portal not found"
        })
    }

    res.status(200).json({
        success: true,
        portal
    })
})

exports.updatePortal = catchAsyncErrors(async (req, res, next) => {
    try {
        let portal = await Portal.findById(req.params.id);

        if (!portal) {
            return res.status(404).json({
                success: false,
                message: "Portal not found"
            });
        }

        let updatedData = req.body;

        if (req.files && req.files.profilePicture) {
            const profilePictureFile = req.files.profilePicture;

            const uploadResult = await cloudinary.uploader.upload(profilePictureFile.tempFilePath, {
                folder: "Portal Pictures"
            });

            updatedData.profilePicture = uploadResult.url;
        }

        portal = await Portal.findByIdAndUpdate(req.params.id, updatedData, {
            new: true,
            runValidators: true,
            useFindandModify: false
        });

        res.status(200).json({
            success: true,
            portal
        });
    } catch (error) {
        console.error("Error updating portal:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the portal."
        });
    }
});


exports.deletePortal = catchAsyncErrors(async (req, res, next) => {
    const portal = await Portal.findById(req.params.id);

    if (!resume) {
        res.status(500).json({
            success: false,
            message: "Portal not found"
        })
    }

    await Portal.deleteOne({ _id: req.params.id });

    res.status(200).json({
        success: true,
        message: "Portal deleted"
    })
})
