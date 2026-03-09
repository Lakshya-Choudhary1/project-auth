const setCookie = (res,token) =>{
     res.cookie(process.env.JWT_TOKEN_NAME,token,{
          httpOnly: true, //cookie cannot be accessed from client side js
          secure: process.env.NODE_ENV === "production",//https
          maxAge: 7*24*60*60*1000,
          sameSite:"lax",
          path:"/"
     })
}

export default setCookie;