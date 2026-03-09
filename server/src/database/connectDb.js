import mongoose from "mongoose";

mongoose.connection.once('open',()=>{
     console.log("Mongoose connection is established");
})

mongoose.connection.on('error',()=>{
     console.log("Error in Connecting to mongoose")
})


const connectDb = async(connectionString)=>{
     try{
          await mongoose.connect(connectionString);
          console.log("Connected to database:",mongoose.connection.name)
     }catch(error){
          console.log("Error in connection to mongoode in connectDb.js",error)
     }
}

export default connectDb;