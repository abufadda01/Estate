const Estate = require("../models/estateModel")


const createEstate = async (req , res , next) => {
    try {
        const estate = new Estate(req.body)
        await estate.save()
        res.status(201).json(estate)        
    } catch (error) {
        next(error)
    }
}


module.exports = {createEstate}