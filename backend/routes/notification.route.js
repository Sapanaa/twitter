import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { deleteNotificationsAll, getNotifications} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", protectRoute, getNotifications)
router.delete("/", protectRoute, deleteNotificationsAll)
// router.delete("/:id", protectRoute, deleteNotification)
export default router