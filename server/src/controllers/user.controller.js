import userModel from "../models/user.model.js";
import bcrypt  from "bcrypt";
import crypto from "crypto"
import generateJwtToken from "../util/generateJwtToken.js"
import setCookie from "../util/setCookie.js"

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

          user.password = null;
          
          //generate token and set cookie
          const jwtToken = generateJwtToken(user._id);
          setCookie(res,jwtToken);

          return res.status(200).json({user,message:"Login Successfull"});

     }catch(err){
          console.error("Login error:", err);
          return res.status(500).json({ message: "Server error during login" });
     }
}

export const logoutController = async(req,res)=>{
     try{
          //clear cookie
          res.clearCookie(process.env.JWT_TOKEN_NAME);

          if(req.logout){
               req.logout((err)=>{
                    console.log("Req logout error",error)
               });
          }
          
          //clear session
          if(req.session){
               req.session.destroy(err=>{
                    console.log("Session Destroy error : " , err);
               });
          }

          return res.status(200).json({message:"Logout successFull"})
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

          const hashedPassword = await bcrypt.hash(password,process.SALT_ROUND);
          const token = Math.floor(100000+(Math.random()*900000)).toString();

          const user = await userModel.create({     
               fullName,
               email,
               password:hashedPassword,
               emailVerificationToken:token,
               emailVerificationTokenExpiry: new Date(Date.now()+(1000*60*2))
          })

          // sendTokenToEmail(email,token);

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

export const checkAuthController = async(req,res)=>{
     //generate token and set cookie
          const token = generateJwtToken(req.user._id);
          setCookie(res,token);
     return res.status(201).json({user:req.user,message:"Successfull Login."})
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
               passwordResetTokenExpiry: new Date(Date.now()+(1000*60*2))
          })

          if(!user){
               return res.status(401).json({message:"User Not Found."})
          }

          const uri = process.env.CLIENT_URL;
          const link = `${uri}/resetPassword/${resetToken}`;
          
          // sendResetLink(email,link);

          return res.status(200).json({message:"Forgot Link Send To Email."})

     }catch(err){
          console.error("forgotPassword error:", err);
          return res.status(500).json({ message: "Server error during forgotPassword." });
     }
}

export const resetPasswordController = async(req,res)=>{
     try{
          const {resetToken} = req.params;
          const {password} = req.body;

          if(!resetToken){
               return res.status(400).json({message:"No token exists"});
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

          const hashedPassword = await bcrypt.hash(password,process.env.SALT_ROUND);

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

export const updateProfilePicController = async(req,res)=>{
     try{
          const userId  =  req.user._id;
          const profilePic = req.file.value

     }catch(err){
          console.error("updateProfilePic error:", err);
          return res.status(500).json({ message: "Server error during updateProfilePic" });
     }
}

export const verifyEmailController = async(req,res)=>{
     try{

     }catch(err){
          console.error("verifyEmail error:", err);
          return res.status(500).json({ message: "Server error during verifyEmail" });
     }
} 


