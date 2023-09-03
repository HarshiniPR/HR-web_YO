const User = require('../models/userModel.js')
const catchAsyncErrors = require('../middlewares/catchAsyncError.js');
const sendToken = require('../utils/jwtToken.js');
const sendEmail = require('../utils/sendEmail.js')
const crypto = require('crypto')
const jwt=require('jsonwebtoken')

const generateToken=(id,email)=>{
    const token= jwt.sign({id,email},process.env.JWT_SECRET)
    return token;
}


exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, password, role } = req.body;

    if (req.body.password !== req.body.confirmPassword) {
        res.status(400).json({
            success: false,
            message: "Passwords do not match"
        })
    }

    let user = await User.findOne({ email });

    if (user) {
        return res.json({
            success: false,
            message: "Email already exists"
        });
    }

    try {
        user = await User.create({ firstName, lastName, email, password, role });

        res.status(201).json({
            success: true,
            user,
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                errors,
            });
        }

        res.status(500).json({
            success: false,
            message: 'Something went wrong.',
        });
    }

    console.log(user)
    sendToken(user, 201, res);
})


exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({
            success: false,
            message: "Enter email and password both"
        })
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        res.status(401).json({
            success: false,
            message: "User not found"
        })
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        res.status(401).json({
            success: false,
            message: "Email or Password incorrect"
        })
    }

    sendToken(user, 200, res);
})

// exports.loginUser = catchAsyncErrors(async (req, res) => {
//     console.log(req.body)
//     const { email, password } = req.body;
//     if (!email || !password) {
//         res.status(400).json({
//             success: false,
//             message: "Enter email and password both"
//         })
//     }
//     else {
//         const foundUser = await User.findOne({ email: email })
//         if (foundUser) {
//             const verifyPassword = await bcrypt.compare(foundUser.password,req.body.password);
//             if (verifyPassword) {
//                 const token = generateToken(foundUser._id, foundUser.email)
//                 res.cookie("token", token, {
//                     path: '/',
//                     httpOnly: true,
//                     expires: new Date(Date.now() + 1000 * 86400),
//                     sameSite: "none",
//                     secure: true
//                 })
//                 const { _id, password, createdAt, ...userData } = foundUser._doc
//                 res.status(200).json({ message: "Valid user Login successful", userData })
//             }
//             else {
//                 res.status(400).json({
//                     success: false,
//                     message: "Enter correct password"
//                 })
//             }
//         }
//         else {
//             res.status(400).json({
//                 success: false,
//                 message: "Does not exist"
//             })
//         }
//     }
// })

exports.logout = catchAsyncErrors(async (req, res, next) => {
    // console.log(res.cookies)
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged out Successfully"
    })
})


exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        res.status(404).json({
            success: false,
            message: "User not found"
        })
    }

    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/password/reset/${resetToken}`

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this mail, then please ignore it`

    try {

        await sendEmail({
            email: user.email,
            subject: `HRApp Password reset`,
            message
        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})


exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        res.status(400).json({
            success: false,
            message: "Reset Password Token is Invalid or expired"
        })
    }

    if (req.body.password !== req.body.confirmPassword) {
        res.status(400).json({
            success: false,
            message: "Passwords do not match"
        })
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
})


exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        res.status(400).json({
            success: false,
            message: "Old Password incorrect"
        })
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        res.status(400).json({
            success: false,
            message: "Passwords do not match"
        })
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
})


exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401).json({
            success: false,
            message: "User not found"
        })
    }

    res.status(200).json({
        success: true,
        user
    })

})


exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
    })
})


//routes for employer

exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    });
})

exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(400).json({
            success: false,
            message: `No user found with id: ${req.params.id}`
        })
    }

    res.status(200).json({
        success: true,
        user
    })

})