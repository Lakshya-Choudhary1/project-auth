import express from "express";
import passport from "passport";

import{   loginController,
          signupController,
          verifyEmailController,
          forgotPasswordController,
          resetPasswordController,
          updateProfilePicController,
          checkAuthController,
          logoutController
     } from "../../controllers/user.controller.js"

import verifyUser from "../../middleware/verifyUser.js"
const userRouter = express.Router();

userRouter.get("/test",(req,res)=>{
     res.send("text-successfull")
})

userRouter.post("/login",loginController);
userRouter.post("/signup",signupController);
userRouter.post("/verify-email",verifyEmailController);
userRouter.post("/forgot-password",forgotPasswordController);
userRouter.post("/reset-password/:resetToken",resetPasswordController);

userRouter.put("/update-profilePic/",verifyUser,updateProfilePicController);

userRouter.get("/check-auth",verifyUser,checkAuthController);
userRouter.get('/logout',logoutController)

userRouter.get(
    "/oauth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

userRouter.get(
     "/oauth/google/callback",
     passport.authenticate("google", { failureRedirect: "/login", session: true }),
     (req,res)=>{
          res.redirect("/")
     }
)




export default userRouter;
