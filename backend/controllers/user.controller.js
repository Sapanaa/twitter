import User from "../models/user.models.js";
import { v2 as cloudinary } from "cloudinary";
import Notification from "../models/notification.model.js";
import bcrypt from "bcryptjs";
export const getUserProfile = async (req, res) => {   
    const {username} = req.params;  
    try {
        const user = await User.findOne({username}).select("-password");
        if(!user){
            return res.status(404).json({error:"User not found"});
        }
        res.status(200).json(user);

    }catch (error) {
        console.log(error); 
        res.status(500).json({error:"Internal server error"});
    }
}

export const followUnfollow = async (req, res) => {
    try{
        const {id} = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);
        if(id === req.user._id.toString()){
            return res.status(400).json({error:"You cannot follow yourself"});
        }
        if(!userToModify || !currentUser){
            return res.status(404).json({error:"User not found"});
        }
        const isFollowing = currentUser.following.includes(id);
        if(isFollowing){
            await User.findByIdAndUpdate(id, {$pull: {followers: req.user._id}});
            await User.findByIdAndUpdate(req.user._id, {$pull: {following: id}});
            res.status(200).json({message:"User unfollowed"});
        }else{
            await User.findByIdAndUpdate(id, {$push: {followers: req.user._id}});
            await User.findByIdAndUpdate(req.user._id, {$push: {following: id}});
            //send the notification tot eh users

            const newNotification = new Notification({
                from: req.user._id,
                to: id,
                type: "follow",
                read: false
            })
            await newNotification.save();

            //todo return id of the user as a response
            res.status(200).json({message:"User followed"});
        }
        await currentUser.save();
        await userToModify.save();

    }catch (error) {
        console.log(error); 
        res.status(500).json({error:"Internal server error"});
}
}

export const showsuggested = async (req, res) => {
        try{
            const userId = req.user._id;

            const usersFollowedbyMe = await User.findById(userId).select("following");

            const users = await User.aggregate([
                {
                    $match: {   
                        _id: {$ne:userId}
            }
        },
                {$sample: {size: 10}}
            ]
            )
            const filteredUsers = users.filter((user) => !usersFollowedbyMe.following.includes(user._id));
            const suggestedUsers = filteredUsers.slice(0, 4);

            suggestedUsers.forEach((user) => {
                user.password = null;
            })
            res.status(200).json(suggestedUsers);
        }
        catch (error) {
            console.log(error); 
            res.status(500).json({error:"Internal server error"});
        }

}

export const updateUserProfile = async (req, res) => {
    const {fullname, username, email, currPassword, newPassword, bio, link} = req.body;  
    let {profileImage, coverImage} = req.body;
    const userId = req.user._id;
try{
   
    const user = await User.findById(userId);

    if(!user){
        return res.status(404).json("User not found");
    }
    if((!currPassword && newPassword) || (!newPassword && currPassword)){
        return res.status(400).json({error:"Current and newpassword are required"});
    }
    if(currPassword && newPassword){
        const isMatch = await bcrypt.compare(currPassword, user.password);
        if(!isMatch){
        return res.status(400).json({error:"Current password is incorrect"});
        }
        if(newPassword.length < 6){
            return res.status(400).json({error:"Password must be at least 6 characters"});
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
    }
    if(profileImage){
        if(user.profileImage){
            //https://res.cloudinary.com/dx7l0tq9y/image/upload/v1693004703/teqk6k8wqgq8lqk7tjwq.jpg

            await cloudinary.uploader.destroy(user.profileImage.split("/").pop().split(".")[0]);
        }
        const uploadedResponse = await cloudinary.uploader.upload(profileImage);
        profileImage = uploadedResponse.secure_url;
    }
    if(coverImage){
        if(user.coverImage){
            await cloudinary.uploader.destroy(user.coverImage.split("/").pop().split(".")[0]);
        }
        const uploadedResponse = await cloudinary.uploader.upload(coverImage);
        coverImage = uploadedResponse.secure_url;
    }
    user.fullname = fullname || user.fullname;
    user.username = username || user.username;
    user.email = email || user.email;
    user.link = link || user.link;
    user.bio = bio || user.bio;
    user.profileImage = profileImage || user.profileImage;
    user.coverImage = coverImage || user.coverImage;
    try {
        await user.save();
    } catch (saveError) {
        console.error("Error saving user:", saveError);
        return res.status(500).json({ error: "Failed to save user updates" });
    }
    //password should be null in response
    user.password = null;

    res.status(200).json(user);

}catch (error) {
    console.log(error); 
    res.status(500).json({error:"Internal server error"});
}


}