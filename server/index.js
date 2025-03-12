import connectToDB from "./config/db.js"
import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.get('/', (req, res) => {
    res.send("Hello world")
})

connectToDB()
	.then(() => {
		app.listen(process.env.PORT, () => {
		    console.log("Connected to Database and Server running on PORT " + process.env.PORT)
		})
	})
	.catch((error) => {
		console.log(error)
	})
