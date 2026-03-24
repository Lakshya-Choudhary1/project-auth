import dotenv from "dotenv";
import app from "./app.js"

import connectDb from "./database/connectDb.js";
dotenv.config();



const start = async()=>{
     try{
          //connecting to db
          await connectDb(process.env.Mongoose_Connection_String);
          
          //starting port
          const PORT = process.env.PORT || 4000;
          app.listen(PORT,()=>{
          console.log("SERVER IS RUNNING ON PORT : " , PORT);
          })

     }catch(error){
          console.log(error);
     }
     
}

start();

