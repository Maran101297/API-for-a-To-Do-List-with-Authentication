const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
module.exports = {
    SendOTP: async function(email, otp){
        const transporter = await  createTransport();

        const mailOptions = {
            from: 'Todo List <maran101297@gmail.com>',
            to: email,
            subject: 'Welcome to Todo Management System Verify Your OTP Code',
            text: `Your OTP code is ${otp}. It will expire in 15 minutes.`
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Error sending email:', error);
              return res.status(500).json({ message: 'Error sending OTP' });
            }
            console.log('Email sent:', info.response);
        });
      
    }
}

function createTransport(){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        secure: false,
        auth:{
            user: process.env.ADMIN_EMAIL,
            pass: process.env.Admin_Pass
        },
        tls:{
            rejectUnauthorized: false
        }
    });
    return transporter;
}