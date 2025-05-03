const connectToDB = require('./config/db.js')
const express= require('express')
const dotenv = require('dotenv')
const authRouter = require('./routes/authRoutes')

dotenv.config()

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello world")
})

app.use('/api/auth', authRouter)

connectToDB()
	.then(() => {
		app.listen(process.env.PORT, () => {
		    console.log("Connected to Database and Server running on PORT " + process.env.PORT)
		})
	})
	.catch((error) => {
		console.log(error)
	})
