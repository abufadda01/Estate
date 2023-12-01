const Joi = require("joi")
const User = require("../models/userModel")
const createError = require("../utils/createError")


const signUp = async (req , res , next) => {

    const signUpSchema = Joi.object({
        username : Joi.string().required().min(3),
        email : Joi.string().email().required(),
        password : Joi.string().required().min(8)
    })
    
    const {value , error} = signUpSchema.validate(req.body , {abortEarly : false})

    if(error){
        return next(createError(400 , "Invalid Credentials"))
    }

    const {username , email , password} = value

    try {
        
        const user = new User({
            username ,
            email ,
            password
        })

        await user.save()

        res.json(user)


    } catch (error) {
        next(error)
    }
}




module.exports = {signUp}