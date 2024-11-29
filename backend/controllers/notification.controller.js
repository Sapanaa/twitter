
import Notification from "../models/notification.model.js";
export const getNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        const notifications = await Notification.find({ to: userId }).populate(
            {path: "from", select: "usernaeme profileImage"});
            await Notification.updateMany({ to: userId }, { read: true });
        res.status(200).json(notifications);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteNotificationsAll = async (req, res) => {
    try {
        const userId = req.user._id;

        await Notification.deleteMany({ to: userId });
        res.status(200).json({ message: "Notifications deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}


// export const deleteNotification = async (req, res) => {
//     try{
//         const notificationId = req.params.id;
//         const userId = req.user._id;
//         const notification = await Notification.findById(notificationId);

//         if(!notification) return res.status(404).json({error:"Notification not found"});

//         //if not the owner
//         if(notification.to.toString() !== userId) return res.status(401).json({error:"You are not authorized to delete this notification"});


//         await Notification.findByIdAndDelete(notificationId);
//         res.status(200).json({message:"Notification deleted"});

//     }
//     catch(error){
//         res.status(500).json({error:"Internal server error"});
//     }
// }