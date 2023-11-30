const express = require("express") 
const connectDB = require("./db/connectDB")
const cors = require("cors")
require("dotenv").config()


const app = express()


app.use(express.json())
app.use(cors())



const authRoutes = require("./routes/authRoutes")
app.use("/api/auth" , authRoutes)



// custom error handler middlewre
app.use((err , req , res , next) => {

    let errorObject = {
        msg : err.message || "Somthing went wrong !" ,
        statusCode : err.status || 500
    }

    return res.status(errorObject.statusCode).json({
        success : false ,
        statusCode : errorObject.statusCode ,
        msg : errorObject.msg
    })

})




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
