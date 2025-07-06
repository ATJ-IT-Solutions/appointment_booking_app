import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import userRouter from './routes/userRoute.js'
const router = express.Router()
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

router.get('/',(req,res)=>{
    res.send("API working")
})

module.exports = router
app.listen(port, ()=> console.log("Server Started",port))