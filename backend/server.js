import express from 'express'
import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary';
import authRoutes from './routes/auth.routes.js'
import connectDB from './db/connectDB.js'
import cookieParser from 'cookie-parser'

import userRoutes from './routes/user.routes.js'
import postRoutes from './routes/post.routes.js'
dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
})
const app = express()

const port = process.env.PORT || 3000

//console.log("Mongo URI from .env:", process.env.MONGO_URI);
app.use(express.json())  //to accept json req.body
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/api/auth", authRoutes);  //localhost/api/auth
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    connectDB()

})