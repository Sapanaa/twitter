import bcrypt from "bcryptjs";
import User from "../models/user.models.js";
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
export const signup = async (req, res) => {
    try {

        const {fullname, username, email, password} = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({error:"Invalid email format"});
        }
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const existingEmail = await User.findOne({email});
        if(existingEmail){
            return res.status(400).json({message:"Email already exists"});
        }

     //hash password 
const salt = bcrypt.genSaltSync(10);
const hashpassword = bcrypt.hashSync(password, salt);

const nuser = new User({
    fullname,
    username,
    email,
    password: hashpassword,
})

        if(nuser){
            generateTokenAndSetCookie(nuser._id, res);
            await nuser.save();

            res.status(201).json({
                _id : nuser._id,
                fullname : nuser.fullname,
                username : nuser.username,  
                email : nuser.email,
                followers : nuser.followers,
                following : nuser.following,
                profileImage : nuser.profileImage,
                coverImage : nuser.coverImage,
               });
        }else{
            res.status(400).json({error:"User not created"});
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
}





export const logout = async (req, res) => {
        try {
            res.cookie("jwt","",{maxAge: 0})
                res.status(200).json({message:"User logged out"})
        }
        catch (error) {
            console.log(error);
            res.status(500).json({error:"Internal server error"});
        }
    }

    export const login = async (req, res) => {
        try{
            const {username,password} = req.body;
            const user = await User.findOne({username});
           const isPasswordCorrrect = await bcrypt.compare(password, user.password);

        if(!user || !isPasswordCorrrect){
            return res.status(400).json({error:"User not found"});
        }
        generateTokenAndSetCookie(user._id, res);
            res.status(201).json({
                _id : user._id,
                fullname : user.fullname,
                username : user.username,  
                email : user.email,
                followers : user.followers,
                following : user.following,
                profileImage : user.profileImage,
                coverImage : user.coverImage,
               });
        
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
        
    }

    export const getMe = async (req, res) => {
        try {
            const user = await User.findById(req.user._id).select("-password");
            res.status(200).json(user);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({error:"Internal server error"});
        }
    }   