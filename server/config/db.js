const mongoose = require('mongoose')

async function connectToDB() {
	
	try {
		await mongoose.connect(process.env.MONGO_URI)
	}
	catch(error) {
		console.log(error)
	}
}

module.exports = connectToDB