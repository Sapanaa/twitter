import express from "express";
import { signup , login} from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/signup", signup) //localhost/api/auth/signup import it from the controller to make it easy

router.get("/login",login)
router.get("/logout", )

export default router;