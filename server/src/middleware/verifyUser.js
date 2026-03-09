import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

const verifyUser = async (req, res, next) => {
     try {
          let user = null;

          // user from session;
          if(req.isAuthenticated()){//user is attached by passpost.session to req in 
               return next();
          }else if(req.cookies?.[process.env.JWT_TOKEN_NAME]){//user from cookie
               try{
                    const token = req.cookies[process.env.JWT_TOKEN_NAME];
                    const decode = jwt.verify(token,process.env.JWT_SECRET);
                    user = await userModel.findById(decode.userId).select("-password");

               }catch(err){
                    console.log("JWT Error:", err.message);
                    return res.status(401).json({ message: "Invalid or expired token" });
               }
          }

          if(!user){
               return res.status(401).json({ message: "Unauthorized: No user found" });
          }

          req.user = user;
          next();

     } catch (error) {
          return res.status(401).json({
               message: "INVALID OR EXPIRED TOKEN"
          });
     }
};

export default verifyUser;