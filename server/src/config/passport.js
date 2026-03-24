import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "../models/user.model.js";
import dotenv from 'dotenv'
dotenv.config();

const uri = process.env.NODE_ENV === "production" ? "https://project-auth-wepq.onrender.com/api/user/oauth/google/callback" : "http://localhost:3000/api/user/oauth/google/callback";

passport.use(new GoogleStrategy({
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    clientID: process.env.GOOGLE_CLIENT_ID,
    callbackURL: uri
}, async (accessToken, refreshToken, profile, done) => {
    try {
        
        const email = profile.emails[0].value;
        let user = await userModel.findOne({ email });

        if (!user) {
            user = await userModel.create({
                fullName: profile.displayName,
                email,
                profilePic: profile.photos[0].value,
                emailVerified: true,
                password:`google${profile.id}`
            });
        }

        done(null, user); // attach user to session

    } catch (error) {
        done(error, false);
    }
}));

// Serialize user to session
passport.serializeUser((user, done) => {
    done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.findById(id).select("-password");
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});