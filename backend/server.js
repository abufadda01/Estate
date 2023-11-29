const express = require("express") 
const connectDB = require("./db/connectDB")
require("dotenv").config()


const app = express()




const PORT = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB()
        app.listen(PORT , () => {
            console.log(`server started on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)        
    }
}

start()
