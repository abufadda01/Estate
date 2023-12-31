const createError = require("../utils/createError")
const bcrypt = require("bcrypt")
const User = require("../models/userModel")
const Estate = require("../models/estateModel")


const updateUserProfile = async (req , res , next) => {

    if(req.userId !== req.params.userId) return next(createError(401 , "you can only update your profile"))

    try {
        
        const {username , email , password , avatar } = req.body

        if(password){
            password = await bcrypt.hash(password , 10)
        }

        const user = await User.findByIdAndUpdate(req.params.userId , {
            $set : {
                username,
                email,
                password,
                avatar
            }
        } , {new : true})
        
        user.password = undefined

        res.status(200).json(user)

    } catch (error) {
        next(error)
    }

}




const deleteUserProfile = async (req , res , next) => {

    if(req.userId !== req.params.userId) return next(createError(401 , "You can only delete your account"))

    try {
        await User.findByIdAndDelete(req.params.userId)
        res.status(200).json({msg : "User delete successfully"})
    } catch (error) {
        next(error)
    }
}




const getUserEstates = async (req , res , next) => {
    
    if(req.userId !== req.params.userId) return next(createError(401 , "you can only view your estates"))

    try {
        const estates = await Estate.find({user : req.params.userId})
        
        res.status(200).json(estates)
    
    } catch (error) {
        next(error)
    }
}




const getUser = async (req , res , next) => {
    try {
        const {userId} = req.params
        
        const user = await User.findById(userId)
        
        if(!user){
            return next(createError(404 , "User not exist"))
        }

        res.status(200).json(user)

    } catch (error) {
        next(error)        
    }
}



module.exports = {updateUserProfile , deleteUserProfile , getUserEstates , getUser}