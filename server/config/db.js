const mongoose = require('mongoose')

const connectDB = async () => {
   try {
    const conn = await mongoose.connect(process.env.MONGO_URL)
    console.log(`MongoDB connected : ${conn.connection.host}`)
   } catch (error) {
    console.log('error:' , error.message)
    //from nodejs and it is basically telling u to terminate everything if there is an error
    process.exit(1)   
   }
}
module.exports = connectDB