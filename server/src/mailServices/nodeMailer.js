import nodemailer from "nodemailer";
import {emailVerificationTemplate,forgotPasswordTemplate} from "./templates.js";
import dotenv from "dotenv";
dotenv.config();

const CLIENT_URL = process.env.NODE_ENV === "production" ? process.env.CLIENT_URL : "http://localhost:5173" ;

const transporter = nodemailer.createTransport({
     service:"Gmail",
     auth:{
          user:"choudharylakshya.lc@gmail.com",
          pass:process.env.NODEMAILER_PASS
     }
})


export const sendEmailVerification = async(email,fullName,token)=>{
     try {
      const res =   await transporter.sendMail({
               from: process.env.NODEMAILER_FROM_EMAIL,
               to: email,
               subject:"Email Verification!",
               html: emailVerificationTemplate(fullName,token)
          })
          
          console.log(res.messageId);
     } catch (error) {
          console.log(error);
     }
}

export const sendResetPasswordLink = async(email,token)=> {
     try {
          const url =  CLIENT_URL+`/resetPassword/${token}`
          const res = await transporter.sendMail({
               from:process.env.NODEMAILER_FROM_EMAIL,
               to: email,
               subject:"Password Reset Link! - Auth Project",
               html: forgotPasswordTemplate(url),
          })  
          console.log(res.messageId) 
     } catch (error) {
          console.log(error) 
     }
}

