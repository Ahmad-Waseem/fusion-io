const connectToDB = require('./config/db.js')
const express= require('express')
const dotenv = require('dotenv')
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes.js')
const hackathonRouter = require('./routes/hackathonRoutes.js')
const messageRouter = require('./routes/messageRoutes.js')
const cors = require('cors')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello world")
})

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/hackathon', hackathonRouter)
app.use('/api/message', messageRouter)

connectToDB()
	.then(() => {
		app.listen(process.env.PORT, () => {
		    console.log("Connected to Database and Server running on PORT " + process.env.PORT)
		})
	})
	.catch((error) => {
		console.log(error)
	})
