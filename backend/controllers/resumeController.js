const Resume=require("../models/resumeModel.js");
const catchAsyncErrors = require('../middlewares/catchAsyncError.js');
const ApiFeatures = require('../utils/apiFeatures.js');
const cloudinary=require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


exports.createResume = catchAsyncErrors(async (req, res, next) => {
    let uploadedFiles = [];

    if (req.files) {
        uploadedFiles = await Promise.all(
            Object.values(req.files).map(async (file, index) => {
                const folder = index === 0 ? 'images' : 'templates';
                const result = await cloudinary.uploader.upload(file.tempFilePath, { folder });
                return result.url;
            })
        );
    }

    const {
        firstName,
        middleName,
        lastName,
        designation,
        address,
        email,
        phoneNo,
        summary,
        achievements,
        experience,
        education,
        projects,
        skills,
    } = req.body;

    const achievementsArray = achievements ? JSON.parse(achievements) : [];
    const experienceArray = experience ? JSON.parse(experience) : [];
    const educationArray = education ? JSON.parse(education) : [];
    const projectsArray = projects ? JSON.parse(projects) : [];

    const resumeData = {
        firstName,
        middleName,
        lastName,
        designation,
        address,
        email,
        phoneNo,
        summary,
        achievements: achievementsArray,
        experience: experienceArray,
        education: educationArray,
        projects: projectsArray,
        skills,
        user: req.user.id,
    };

    if (uploadedFiles.length > 0) {
        if (uploadedFiles.length === 1) {
            if (uploadedFiles[0].includes('images')) {
                resumeData.image = uploadedFiles[0];
            } else if (uploadedFiles[0].includes('templates')) {
                resumeData.template = uploadedFiles[0];
            }
        } else if (uploadedFiles.length === 2) {
            resumeData.image = uploadedFiles[0];
            resumeData.template = uploadedFiles[1];
        }
    }

    const resume = await Resume.create(resumeData);

    res.status(201).json({
        success: true,
        resume,
    });
});



exports.getAllResume = catchAsyncErrors(async (req, res) => {

    const resultPerPage = 5;
    const resumeCount=await Resume.countDocuments();

    const apiFeature = new ApiFeatures(Resume.find(), req.query).search().filter().pagination(resultPerPage);

    const resumes = await apiFeature.query;

    res.status(200).json({
        success: true,
        resumes,
        resumeCount 
    })
})

exports.getResumeDetails = catchAsyncErrors(async (req, res, next) => {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
        res.status(500).json({
            success: false,
            message: "Resume not found"
        })
    }

    res.status(200).json({
        success: true,
        resume
    })
})

exports.updateResume = catchAsyncErrors(async (req, res, next) => {
    let resume = await Resume.findById(req.params.id);

    if (!resume) {
        res.status(500).json({
            success: false,
            message: "Resume not found"
        })
    }

    resume = await Resume.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindandModify: false
    });

    res.status(201).json({
        success: true,
        resume
    })
})

exports.deleteResume = catchAsyncErrors(async (req, res, next) => {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
        res.status(500).json({
            success: false,
            message: "Resume not found"
        })
    }

    await Resume.deleteOne({ _id: req.params.id });

    res.status(200).json({
        success: true,
        message: "Resume deleted"
    })
})