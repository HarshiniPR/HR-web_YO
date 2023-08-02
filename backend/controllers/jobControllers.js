const Job=require("../models/jobModel.js");
const catchAsyncErrors = require('../middlewares/catchAsyncError.js');
const ApiFeatures = require('../utils/apiFeatures.js');

exports.postJob = catchAsyncErrors(async (req, res, next) => {
    req.body.user=req.user.id;
    const job = await Job.create(req.body);

    res.status(201).json({
        success: true,
        job
    })
})

exports.getAllJobs = catchAsyncErrors(async (req, res) => {

    const resultPerPage = 5;
    const jobCount=await Job.countDocuments();

    const apiFeature = new ApiFeatures(Job.find(), req.query).search().filter().pagination(resultPerPage);

    const jobs = await apiFeature.query;

    res.status(200).json({
        success: true,
        jobs,
        jobCount 
    })
})

exports.getJobDetails = catchAsyncErrors(async (req, res, next) => {
    const job = await Job.findById(req.params.id);

    if (!job) {
        res.status(500).json({
            success: false,
            message: "Job not found"
        })
    }

    res.status(200).json({
        success: true,
        job
    })
})

exports.updateJob = catchAsyncErrors(async (req, res, next) => {
    let job = await Job.findById(req.params.id);

    if (!job) {
        res.status(500).json({
            success: false,
            message: "Job not found"
        })
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindandModify: false
    });

    res.status(201).json({
        success: true,
        job
    })
})

exports.deleteJob = catchAsyncErrors(async (req, res, next) => {
    const job = await Job.findById(req.params.id);

    if (!job) {
        res.status(500).json({
            success: false,
            message: "Job not found"
        })
    }

    await Job.deleteOne({ _id: req.params.id });

    res.status(200).json({
        success: true,
        message: "Job deleted"
    })
})