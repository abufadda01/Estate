const express = require("express") 
const connectDB = require("./db/connectDB")
const cors = require("cors")
require("dotenv").config()


const app = express()


app.use(express.json())
app.use(cors())



const authRoutes = require("./routes/authRoutes")
app.use("/api/auth" , authRoutes)




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
