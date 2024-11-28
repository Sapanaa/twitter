import express from "express";
import { signup , login} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup) //localhost/api/auth/signup import it from the controller to make it easy

router.post("/login",login)
router.post("/logout", )

export default router;