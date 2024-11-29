import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { createPost , deletePost, likeUnlikePost,  commentPost, getAllPosts, getLikedPosts, getPostsFollowing, getusersPosts} from "../controllers/post.controller.js";
const router = express.Router();


router.get("/all",protectRoute, getAllPosts)
router.get("/following", protectRoute, getPostsFollowing)
router.get("/likes/:id",protectRoute, getLikedPosts)
router.get("/user/:username",protectRoute, getusersPosts)
router.post("/create",protectRoute, createPost)
router.delete("/:id",protectRoute, deletePost)
router.post("/like/:id",protectRoute, likeUnlikePost)
router.post("/comment/:id",protectRoute, commentPost)

export default router