import express from 'express'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.routes.js'
import connectDB from './db/connectDB.js'


dotenv.config()
const app = express()

const port = process.env.PORT || 3000

//console.log("Mongo URI from .env:", process.env.MONGO_URI);
app.use(express.json())  //to accept json req.body
app.use(express.urlencoded({ extended: true }))
app.use("/api/auth", authRoutes);  //localhost/api/auth
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    connectDB()

})