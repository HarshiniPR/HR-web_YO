const Test=require("../models/testModel.js");
const catchAsyncErrors = require('../middlewares/catchAsyncError.js');
const ApiFeatures = require('../utils/apiFeatures.js');

exports.newTest = catchAsyncErrors(async (req, res, next) => {
    req.body.user=req.user.id;
    const test = await Test.create(req.body);

    res.status(201).json({
        success: true,
        test
    })
})

exports.getTestDetails = catchAsyncErrors(async (req, res, next) => {
    const test = await Test.findById(req.params.id);

    if (!test) {
        res.status(500).json({
            success: false,
            message: "not found"
        })
    }

    res.status(200).json({
        success: true,
        test
    })
})

exports.getAllTests = catchAsyncErrors(async (req, res) => {

    const resultPerPage = 5;
    const testCount=await Test.countDocuments();

    const apiFeature = new ApiFeatures(Test.find(), req.query).search().filter().pagination(resultPerPage);

    const tests = await apiFeature.query;

    res.status(200).json({
        success: true,
        tests,
        testCount 
    })
})