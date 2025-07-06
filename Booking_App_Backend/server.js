import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import userRouter from './routes/userRoute.js'
import serverless from 'serverless-http'

//app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// app middlewares

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'));
//api endpoints
app.use('/api/admin',adminRouter)
app.use('/api/user',userRouter)

app.get('/',(req,res)=>{
    res.send("API working")
})

module.exports = app
module.exports.handler = serverless(app)