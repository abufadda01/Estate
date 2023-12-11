const express = require("express") 
const connectDB = require("./db/connectDB")
const cors = require("cors")
const cookieParser = require("cookie-parser")
require("dotenv").config()


const app = express()


app.use(express.json())
app.use(cors())
app.use(cookieParser())



const authRoutes = require("./routes/authRoutes")
app.use("/api/auth" , authRoutes)

const userRoutes = require("./routes/userRoutes")
app.use("/api/user" , userRoutes)



// custom error handler middlewre
app.use((err , req , res , next) => {

    let errorObject = {
        msg : err.message || "Somthing went wrong !" ,
        statusCode : err.status || 500
    }

    // check if there is an error code already then check its value , 11000 means there is a duplicate record
    if(err.code && err.code === 11000){
        errorObject.statusCode = 500
        errorObject.msg = "user already exist"
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
