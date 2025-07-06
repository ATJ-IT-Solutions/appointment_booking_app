const express = require('express')
const serverless = require('serverless-http') // middleware to make Express work in serverless
const cors = require('cors')
const adminRouter = require('./routes/admin') // adjust paths
const userRouter = require('./routes/user')
const connectDB = require('./config/db')
const connectCloudinary = require('./config/cloudinary')

const app = express()
connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
  res.send('API working from Vercel!')
})

// export serverless handler
module.exports = app
module.exports.handler = serverless(app)