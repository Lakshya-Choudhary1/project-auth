import express from "express";
import passport from "passport";

import{   loginController,
          signupController,
          verifyEmailController,
          forgotPasswordController,
          resetPasswordController,
          checkAuthController,
          logoutController,
          resendSignUpToken
     } from "../../controllers/user.controller.js"

import verifyUser from "../../middleware/verifyUser.js"
const userRouter = express.Router();

userRouter.get("/test",(req,res)=>{
     res.send("text-successfull")
})

userRouter.post("/login",loginController);//works

userRouter.post("/signup",signupController);//works
userRouter.post("/resendSignupToken",resendSignUpToken);//works

userRouter.post("/verifyEmail",verifyEmailController);//works

userRouter.post("/forgotPassword",forgotPasswordController);//works


userRouter.post("/resetPassword",resetPasswordController);

userRouter.get("/checkAuth",verifyUser,checkAuthController);//works

userRouter.get('/logout',logoutController)//works

userRouter.get(
    "/oauth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

userRouter.get(
     "/oauth/google/callback",
     passport.authenticate("google", { failureRedirect: "/ login", session: true }),
     (req,res)=>{
          
         return res.redirect("/")
     }
)




export default userRouter;
