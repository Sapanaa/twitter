import express from 'express'
import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary';
import authRoutes from './routes/auth.route.js'
import connectDB from './db/connectDB.js'
import cookieParser from 'cookie-parser'
import path from 'path'
import userRoutes from './routes/user.route.js'
import postRoutes from './routes/post.route.js'
import notificationRoutes from './routes/notification.route.js'
dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
})
const app = express()

const port = process.env.PORT || 5000
const __dirname = path.resolve();
//console.log("Mongo URI from .env:", process.env.MONGO_URI);


app.use(express.json({limit: "5mb"}))  //to accept json req.body
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/api/auth", authRoutes);  //localhost/api/auth
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    connectDB()

})