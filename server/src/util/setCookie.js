const setCookie = (res,token) =>{
     res.cookie(process.env.JWT_TOKEN_NAME,token,{
          httpOnly: false, //cookie cannot be accessed from client side js
          secure: process.env.NODE_ENV === "production",//https
          maxAge: 7*24*60*60*1000,
          sameSite:"none",
          path:"/"
     })
}

export default setCookie;