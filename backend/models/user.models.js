import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    followers: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
        }
    ],
    following: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
        }
    ],
    profileImage: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        default: "",
    },
    link: {
        type: String,
        default: "",
    },
   

},{timestamps: true});

const User = mongoose.model("User", userSchema);
//users
export default User