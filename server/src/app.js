import express,{json,urlencoded} from "express";
import cookieParser from "cookie-parser" 
import helmet from "helmet"
import cors from "cors"
import passport from "passport";
import path from "path"
import url from "url"
import session from "express-session";
import mainRouter from "./routers/main.route.js"
import "./config/passport.js";

const app = express();

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

const whitelist_urls = process.env.WHITELIST_URLS
  ? process.env.WHITELIST_URLS.replace(/[\[\]\s]/g, "").split(",")
  : [];


app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
      imgSrc: ["'self'", "data:", "blob:"],
      connectSrc: ["'self'", "http://localhost:3000", "http://localhost:5173", "ws://localhost:5173"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      frameAncestors: ["'none'"],
    },
  })
);
app.use(cors({
     origin:(origin,callback)=>{
          if(!origin) return callback(null,true);
          if (whitelist_urls.length === 0 ||whitelist_urls.includes(origin)){
               return callback(null, true);
          }
          callback(new Error("CORS ERROR: Origin not allowed"));
     },
     credentials:true
}))
app.use(urlencoded({extended:true,limit:"10mb"}));
app.use(json({limit:"10mb"}))
app.use(cookieParser())

app.use(session({
     secret:process.env.SESSION_SECRET,
     resave:false,
     saveUninitialized:false,
     cookie:{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days,
        sameSite: "lax"
    }
}))

app.use(passport.initialize())
app.use(passport.session());
app.use("/api",mainRouter)

app.get('/test',(req,res)=>{
     return res.send("success");
})

if(process.env.NODE_ENV === 'production'){
     app.use(express.static(path.join(__dirname,"../public")))
     app.use("/",(req, res) => {
     return res.sendFile(path.join(__dirname,"../public/index.html"));
     })
}

app.use(express.static(path.join(__dirname,"../public")))
     app.use("/",(req, res) => {
     return res.sendFile(path.join(__dirname,"../public/index.html"));
     })





export default app;