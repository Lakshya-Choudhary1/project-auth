import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
     fullName:{
          type:String,
          required:true,
          trim:true
     },
     email:{
          type:String,
          required:true,
          unique:true,
          lowercase:true,
          trim:true,
     },
     password:{
          type:String,
          required:true,
          minlength:6,
          trim:true,
     },
     emailVerified:{
          type:Boolean,
          default:false
     },
     emailVerificationToken:String,
     emailVerificationTokenExpiry:Date,
     passwordResetToken:String,
     passwordResetTokenExpiry:Date
},{
     timestamps:true
})

const userModel = mongoose.model("User",userSchema);
export default userModel;