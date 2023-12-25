const Estate = require("../models/estateModel")
const createError = require("../utils/createError")


const createEstate = async (req , res , next) => {
    try {
        const estate = new Estate(req.body)
        await estate.save()
        res.status(201).json(estate)        
    } catch (error) {
        next(error)
    }
}




const deleteEstate = async (req , res , next) => {
    try {

        const estate = await Estate.findById(req.params.estateId)

        if(!estate){
            return next(createError(404 , "Estate not exist"))
        }

        if(req.userId !== estate.user){
            return next(createError(401 , "you can only delete your own Estates"))
        }

        await Estate.findByIdAndDelete(req.params.estateId)

        console.log(typeof estate.user)

        res.status(200).json({msg : "estate deleted successfully"})

    } catch (error) {
        next(error)
    }
}



module.exports = {createEstate , deleteEstate}