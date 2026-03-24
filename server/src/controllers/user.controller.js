import userModel from "../models/user.model.js";
import bcrypt  from "bcrypt";
import crypto from "crypto"
import generateJwtToken from "../util/generateJwtToken.js"
import setCookie from "../util/setCookie.js"
import {sendEmailVerification,sendResetPasswordLink} from "../mailServices/nodeMailer.js"

export const loginController = async(req,res)=>{
     try{
          const {email,password} = req.body;

          if(!email || !password || password.length<6){
               return res.status(400).json({message:"Invalid Credantial"})
          }

          const user = await userModel.findOne({email});

          if(!user){
               return res.status(401).json({message:"User Not Found"})
          }

          const isMatch  =  await bcrypt.compare(password,user.password);

          if(!isMatch){
               return res.status(401).json({message:"Invalid Credantial"})
          }

          if(!user.emailVerified){
               return res.status(403).json({message:"Please verify your email first"});
          }

           //generate token and set cookie
          const jwtToken = generateJwtToken(user._id);
          setCookie(res,jwtToken);

          const {password:_ , ...userData} = user.toObject();
          
          return res.status(200).json({user:userData,message:"Login Successfull"});

     }catch(err){
          console.error("Login error:", err);
          return res.status(500).json({ message: "Server error during login" });
     }
}

export const logoutController = async (req,res)=>{
     try{

          // clear JWT cookie
          res.clearCookie(process.env.JWT_TOKEN_NAME);

          // logout passport session only if it exists
          if(req.user && req.logout){
               req.logout(function(err){
                    if(err){
                         console.log("Logout error:",err);
                    }
               });
          }

          // destroy session if it exists
          if(req.session){
               req.session.destroy((err)=>{
                    if(err){
                         console.log("Session destroy error:",err);
                    }
               });
          }

          return res.status(200).json({message:"Logout successful"});

     }catch(err){
          console.error("Logout error:", err);
          return res.status(500).json({ message: "Server error during logout" });
     }
}

export const signupController = async(req,res)=>{
     try{
          const {fullName,email,password} = req.body;

          if(!fullName || !email || !password || password.length<6){
               return res.status(400).json({message:"Invalid Credantials"});
          }

          const findUser  = await userModel.findOne({email}).select("-password");

          if(findUser){
               return res.status(409).json({message:"User Already Exists"});
          }

          const hashedPassword = await bcrypt.hash(password,Number(process.env.SALT_ROUND));
          const token = Math.floor(100000+(Math.random()*900000)).toString();

          const user = await userModel.create({     
               fullName,
               email,
               password:hashedPassword,
               emailVerificationToken:token,
               emailVerificationTokenExpiry: new Date(Date.now()+(1000*60*10))
          })

          await sendEmailVerification(email,fullName,token);

          //generate token and set cookie
          const jwtToken = generateJwtToken(user._id);
          setCookie(res,jwtToken);
           
          const { password: _, ...userData } = user.toObject();

          return res.status(201).json({user:userData,message:"Successfull User Created."})

     }catch(err){
          console.error("SignUp error:", err);
          return res.status(500).json({ message: "Server error during SignUp" });
     }
}

export const resendSignUpToken = async(req,res) =>{
     try{
          const {email} = req.body;

          if(!email){
               return res.status(400).json({message:"Email missing."})
          }

          const user = await userModel.findOne({email});

          if(!user){
               return res.status(400).json({message:"User Not Found"})
          }

          if(user.emailVerified){
               return res.status(400).json({message:"Already verified"});
          }

          if(user.emailVerificationTokenExpiry > Date.now()){
               return res.status(400).json({message:"Token already sent. Please wait before requesting again."});
          }

          const token  = Math.floor(100000+(Math.random()*900000)).toString();
          
          user.emailVerificationToken = token;
          user.emailVerificationTokenExpiry = new Date(Date.now()+(1000*60*10));
          
          await user.save();

          await sendEmailVerification(email,user.fullName,token);

          return res.status(200).json({ message: "Token successfully send" });

     }catch(err){
          console.error("resendSignUp error:", err);
          return res.status(500).json({ message: "Server error during resendSignUpToken" });
     }
}

export const checkAuthController = async(req,res)=>{
          const { password:_, ...userData } = req.user.toObject();
          return res.status(200).json({user: userData,message: "Authenticated"})
}

export const forgotPasswordController = async(req,res)=>{
     try{
          const {email} = req.body;

          if(!email){
               return res.status(401).json({message:"Email Not Found."})
          }

          const resetToken =  crypto.randomBytes(20).toString("hex");

          const user =  await userModel.findOneAndUpdate({email},{
               passwordResetToken:resetToken,
               passwordResetTokenExpiry: new Date(Date.now()+(1000*60*10))
          })

          if(!user){
               return res.status(401).json({message:"User Not Found."})
          }
          
          await sendResetPasswordLink(email,resetToken);

          return res.status(200).json({message:"Forgot Link Send To Email."})

     }catch(err){
          console.error("forgotPassword error:", err);
          return res.status(500).json({ message: "Server error during forgotPassword." });
     }
}

export const resetPasswordController = async(req,res)=>{
     try{
          const {password,resetToken} = req.body;

          if(!resetToken){
               return res.status(400).json({message:"No token exists"});
          }

          if(!password){
               return res.status(400).json({message:"Password Not exists"});
          }

          if(password.length<6){
               return res.status(400).json({message:"password length must be atleast 6"});
          }

          const user = await userModel.findOne({
               passwordResetToken:resetToken,
               passwordResetTokenExpiry: {$gt:Date.now()},
          })
          
          if(!user){
               return res.status(401).json({message:"Expired Token"});
          }

          const hashedPassword = await bcrypt.hash(password,Number(process.env.SALT_ROUND));

          user.password  = hashedPassword;
          user.passwordResetToken = null;
          user.passwordResetTokenExpiry = null;
          await user.save();

          return res.status(200).json({ message: "Password changed successfully." });

     }catch(err){
          console.error("resetPassword error:", err);
          return res.status(500).json({ message: "Server error during resetPassword" });
     }
}

export const verifyEmailController = async(req,res)=>{
     try{
          const {emailVerificationToken} = req.body;

          if( !emailVerificationToken || emailVerificationToken.length < 6){
               return res.status(400).json({message:"Invalud Credentails"});
          }
          const user = await userModel.findOne({
               emailVerificationToken,
               emailVerificationTokenExpiry:{$gt:Date.now()}
          }).select("-password");

          if(!user){
               return res.status(400).json({message:"Invalid Credentails"});
          }

          user.emailVerificationToken = undefined;
          user.emailVerificationTokenExpiry = undefined;
          user.emailVerified = true;
          await user.save();

          return res.status(200).json({user,message:"Email verified SuccessFully"});

     }catch(err){
          console.error("verifyEmail error:", err);
          return res.status(500).json({ message: "Server error during verifyEmail" });
     }
} 