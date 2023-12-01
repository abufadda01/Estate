const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        min : 8,
        select : false
        // if we want to access it again in any controller .select("+password")
    }
} , {timestamps : true})



userSchema.pre("save" , async function(){

    if(!this.isModified("password")) return
 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password , salt)
    this.password = hashedPassword

})


const User = mongoose.model("users" , userSchema)


module.exports = User