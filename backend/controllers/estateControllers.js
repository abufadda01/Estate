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

        res.status(200).json({msg : "estate deleted successfully"})

    } catch (error) {
        next(error)
    }
}




const updateEstate = async (req , res , next) => {
    try {
        
        const estate = await Estate.findById(req.params.estateId)

        if(!estate){
            return next(createError(404 , "Estate not exist"))
        }

        if(req.userId !== estate.user){
            return next(createError(401 , "you can only update your own estates"))
        }

        const updatedEstate = await Estate.findByIdAndUpdate(req.params.estateId , req.body , {new : true})

        res.status(200).json(updatedEstate)

    } catch (error) {
        next(error)
    }
}




const getEstate = async (req , res , next) => {
    try {
        const estate = await Estate.findById(req.params.estateId)

        if(!estate){
            return next(createError(404 , "No Estate founded with this id"))
        }

        res.status(200).json(estate)

    } catch (error) {
        next(error)
    }
} 




const getEstates = async (req , res , next) => {
    try {
        
        const limit = req.query.limit || 9
        const startIndex = req.query.startIndex || 0

        let offer = req.query.offer
        let furnished = req.query.furnished
        let parking = req.query.parking
        let typeOfEstate = req.query.type

        const searchTerm = req.query.searchTerm || ""

        const sort = req.query.sort || "createdAt"
        const order = req.query.order || "desc"


        // if the offer isundefinedor false that means get the both offered and not offerd data in the database both of (true , false)
        if(offer === undefined || offer === "false"){
            offer = {$in : [false , true]}
        }

        if(furnished === undefined || furnished === "false"){
            furnished = {$in : [false , true]}
        }

        if(parking === undefined || parking === "false"){
            parking = {$in : [false , true]}
        }

        if(typeOfEstate === undefined || typeOfEstate === "all"){
            typeOfEstate = {$in : ["sale" , "rent"]}
        }

        const estates = await Estate.find({
            name : {$regex : searchTerm , $options : "i"},
            offer ,
            furnished ,
            parking ,
            typeOfEstate
        })
        // sort the returned documents by the createdAt in desc way {[createdAt] : desc}
        .sort({[sort] : order})
        .limit(limit)
        .skip(startIndex)


        res.status(200).json(estates)


    } catch (error) {
        next(error)
    }
}




module.exports = {createEstate , deleteEstate , updateEstate , getEstate , getEstates}