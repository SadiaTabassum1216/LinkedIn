const Notification = require("../models/notificationModel");

//@desc DELETE old notifications
const deleteOldNotifications = async () => {
    console.log("deleting prev notifications...");
    try {
        const sixHoursAgo = new Date();
        sixHoursAgo.setHours(sixHoursAgo.getHours() - 1);
        const oldNotifications = await Notification.find({ time: { $lt: sixHoursAgo } });

        for (const notification of oldNotifications) {
            console.log("deleting" + notification);
            await notification.remove();
        }

    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch notifications' });
    }

};
module.exports = { deleteOldNotifications };


