import express from "express";
import { signup , login, logout, getMe} from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/me", protectRoute, getMe);
router.post("/signup", signup) //localhost/api/auth/signup import it from the controller to make it easy

router.post("/login",login)
router.post("/logout", logout)



export default router;