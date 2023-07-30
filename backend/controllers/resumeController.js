const Resume=require("../models/resumeModel.js");
const catchAsyncErrors = require('../middlewares/catchAsyncError.js');
const ApiFeatures = require('../utils/apiFeatures.js');

exports.createResume = catchAsyncErrors(async (req, res, next) => {
    req.body.user=req.user.id;
    const resume = await Resume.create(req.body);

    res.status(201).json({
        success: true,
        resume
    })
})

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