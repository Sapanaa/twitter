
import Post from "../models/post.model.js";
import User from "../models/user.models.js";
import { v2 as cloudinary } from "cloudinary";
import Notification from "../models/notification.model.js";

export const createPost = async (req, res) => {
    const { text } = req.body;
    let { img } = req.body; // Use 'let' for img since it may be reassigned
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (!text && !img) return res.status(400).json({ error: "Text or image is required" });

    if (img) {
        const imageUpp = await cloudinary.uploader.upload(img); // Await the upload process
        img = imageUpp.secure_url; // Assign the secure_url to img
    }

    try {
        const newPost = new Post({
            user: userId,
            text,
            img,
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: "Cannot create post server error" });
    }
};

export const deletePost = async (req, res) => {
    try{
        const post =  await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({error:"Post not found"});
        }
        if(post.user.toString() !== req.user._id.toString()){
            return res.status(401).json({error:"Unauthorized"});
        }
        if(post.img){
            const imgId = post.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(post.imgId);
        }
        await Post.findByIdAndDelete(req.params.id); //deleting from the database
        res.status(200).json({message:"Post deleted"});
    }
    catch(error){
        res.status(500).json({error:"Cannot delete post: server error"});
    }
}


export const likeUnlikePost = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id: postId } = req.params; // Extract postId from req.params
        const post = await Post.findById(postId); // Find the post in the database

        // Check if the post exists
        if (!post) return res.status(404).json({ error: "Post not found" });

        // Check if the user has already liked the post
        const userLikedPost = post.likes.includes(userId);

        if (userLikedPost) {
            // Remove the like
            await Post.updateOne({ _id: postId }, { $pull: { likes: userId } }); // Decrement the likes
            await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } }); // Remove the post from the user's likedPosts array

            const updatedLikes = post.likes.filter((id) => id.toString() !== userId.toString());
            return res.status(200).json({ message: "Post unliked" }); // Respond with a message
        } else {
            // Add a like
            post.likes.push(userId); // Increment the likes
            await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
            await post.save();

            // Send a notification
            const notification = new Notification({
                from: userId,
                to: post.user,
                type: "like",
            });
            await notification.save();
            const updatedLikes = post.likes
            return res.status(200).json(post.likes); // Respond with a message
        }
    } catch (error) {
        console.error("Error in likeUnlikePost:", error);
        res.status(500).json({ error: "Cannot like post: server error" });
    }
};



export const commentPost = async (req, res) => {
   try{
    const {text} = req.body;
    const postId = req.params.id;
    const userId = req.user._id;
    const user = await User.findById(userId); //find the user in the database
    if(!user) return res.status(404).json({error:"User not found"});
    const post = await Post.findById(postId); //find the post in the database
    if(!post) return res.status(404).json({error:"Post not found"});
    if(!text) return res.status(400).json({error:"Text is required"});
    const newComment = {
        text,
        user: userId
    }
    post.comments.push(newComment);
    await post.save();
    res.status(200).json( {message:"Comment added"});

   }
   catch(error){
    res.status(500).json({error:"Cannot comment post: server error"});
   }

} 

export const getAllPosts = async (req, res) => {
    try{
        //use to get all the posts find method and populate get eveything of the client
        const posts = await Post.find({}).sort({ createdAt: -1 }).populate({
            path: "user",
            select: "-password",
        }).populate({
            path: "comments.user",
            select: "-password",
        });

        if (posts.length === 0) {
            return res.status(200).json({ error: "No posts found" });
        }
        res.status(200).json(posts);

    }catch(error){
        res.status(500).json({error:"Cannot get posts: server error"});
    }
}

export const getLikedPosts = async (req, res) => {
    const userId = req.user._id;
    try{
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({error:"User not found"});
        const posts = await Post.find({ _id: { $in: user.likedPosts } }).sort({ createdAt: -1 }).populate({
            path: "user",
            select: "-password",
        }).populate({
            path: "comments.user",
            select: "-password",
        });

        res.status(200).json(posts);

    }catch(error){
        res.status(500).json({error:"Cannot get posts: server error"});
    }

}

export const getPostsFollowing = async (req, res) => {
    const userId = req.user._id; //authenticated user
    try{
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({error:"User not found"});
        const followingposts = await Post.find({ user: { $in: user.following } }).sort({ createdAt: -1 }).populate({
            path: "user",
            select: "-password",
        }).populate({
            path: "comments.user",
            select: "-password",
        });
        res.status(200).json(followingposts);
    }catch(error){
        res.status(500).json({error:"Cannot get posts: server error"});
    }
}

export const getusersPosts = async (req, res) => {

    try{
        const {username} = req.params;

        const user = await User.findOne({username});
        if(!user) return res.status(404).json({error:"User not found"});
        const posts = await Post.find({ user: user._id }).sort({ createdAt: -1 }).populate({
            path: "user",
            select: "-password",
        }).populate({
            path: "comments.user",
            select: "-password",
        });
        res.status(200).json(posts);

    }
    catch(error){
        res.status(500).json({error:"Cannot get posts: server error"});
    }
}