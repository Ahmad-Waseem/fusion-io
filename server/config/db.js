const mongoose = require('mongoose')

async function connectToDB() {
	
	try {
		await mongoose.connect(process.env.MONGO_URI)
		console.log("Mongoose Connected at ", process.env.MONGO_URI)
	}
	catch(error) {
		console.log(error)
		console.log("got ERROR")
	}
}

module.exports = connectToDB