const Meeting = require("../models/meetingModel.js");
const catchAsyncErrors = require('../middlewares/catchAsyncError.js');
const validator=require('validator');

exports.createMeeting = catchAsyncErrors(async (req, res, next) => {
    const { title, date, time } = req.body;

    if (!validator.isISO8601(date, { strict: true })) {
        return res.status(400).json({
            success: false,
            message: "Invalid date format. Use YYYY-MM-DD."
        });
    }

    if (!/^((0?[1-9]|1[0-2]):([0-5][0-9]) [APap][Mm])$/.test(time)) {
        return res.status(400).json({
            success: false,
            message: "Invalid time format. Use hh:mm AM/PM."
        });
    }

    try {
        const existingDate = await Meeting.findOne({ date });
        if (existingDate) {
            const existingTime = await Meeting.findOne({ time });
            if (existingTime) {
                return res.status(400).json({
                    success: false,
                    message: "Choose another time."
                });
            }
        }

        const newMeeting = await Meeting.create({ title, date, time });

        res.status(201).json({
            success: true,
            meeting: newMeeting
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                errors
            });
        }

        res.status(500).json({
            success: false,
            message: 'Something went wrong.'
        });
    }
});

exports.deleteMeeting = catchAsyncErrors(async (req, res, next) => {
    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
        res.status(500).json({
            success: false,
            message: "Meet not found"
        })
    }

    await Meeting.deleteOne({ _id: req.params.id });

    res.status(200).json({
        success: true,
        message: "Meet deleted"
    })
})

exports.updateMeeting = catchAsyncErrors(async (req, res, next) => {
    const { date, time } = req.body;

    if (date) {
        if (!validator.isISO8601(date, { strict: true })) {
            return res.json({
                success: false,
                message: "Invalid date format. Use YYYY-MM-DD."
            });
        }

        // Check if the updated date is busy
        const meetingWithSameDate = await Meeting.findOne({ date, _id: { $ne: req.params.id } });
        if (meetingWithSameDate) {
            if (time) {
                // Validate time in 12-hour format with case-insensitive AM/PM
                if (!/^((0?[1-9]|1[0-2]):([0-5][0-9]) [APap][Mm])$/.test(time)) {
                    return res.json({
                        success: false,
                        message: "Invalid time format. Use hh:mm AM/PM."
                    });
                }
        
                // Check if the updated time is busy
                const meetingWithSameTime = await Meeting.findOne({ time: time.toLowerCase(), _id: { $ne: req.params.id } });
                if (meetingWithSameTime) {
                    return res.json({
                        success: false,
                        message: "This time is busy"
                    });
                }
            }
        }
    }

    
    try {
        const updatedFields = {};
        if (date) {
            updatedFields.date = date;
        }
        if (time) {
            updatedFields.time = time;
        }

        const meeting = await Meeting.findByIdAndUpdate(req.params.id, updatedFields, {
            new: true,
            runValidators: true,
            useFindandModify: false
        });

        res.status(201).json({
            success: true,
            meeting
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                errors
            });
        }

        res.status(500).json({
            success: false,
            message: 'Something went wrong.'
        });
    }
});