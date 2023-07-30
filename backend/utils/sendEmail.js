const nodeMailer=require('nodemailer');

const sendEmail=async(options)=>{
    const transporter=nodeMailer.createTransport({
        host:process.env.SMPT_HOST,         //SMPT_HOST such as: smpt.gmail.com
        port:465,
        service:process.env.SMPT_SERVICE,   //SMPT_SERVICE such as: gmail
        secure: true,
        auth:{
            user:process.env.SMPT_MAIL,     //Provide the gmail account from where the password forgot token should se sent
            pass:process.env.SMPT_PASSWORD  //Provide the password. If not working..visit: https://support.google.com/mail/answer/185833?sjid=11698155134031190966-AP and create app password.
        }
    })

    const mailOptions={
        from:process.env.SMPT_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message
    }

    await transporter.sendMail(mailOptions);
};

module.exports=sendEmail