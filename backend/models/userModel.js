const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


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
    },
    avatar : {
        type : String,
        default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fillustrations%2Fempty-profile-picture&psig=AOvVaw0_V51HX6VHC7TKEMbytEMB&ust=1701886526515000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCJDg_8Pz-IIDFQAAAAAdAAAAABAE"
    }
} , {timestamps : true})



userSchema.pre("save" , async function(){

    if(!this.isModified("password")) return
 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password , salt)
    this.password = hashedPassword

})



userSchema.methods.createJWT = function(){
    const token = jwt.sign({id : this._id} , process.env.JWT_SECRET)
    return token
}



const User = mongoose.model("users" , userSchema)


module.exports = User