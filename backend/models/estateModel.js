const mongoose = require("mongoose")


const estateSchema = new mongoose.Schema({
        name : {
            type : String ,
            required : true
        },
        description : {
            type : String ,
            required : true
        },
        address : {
            type : String ,
            required : true
        },
        regularPrice : {
            type : Number,
            required : true
        },
        discountPrice : {
            type : Number,
            required : true
        },
        bedrooms : {
            type : Number,
            required : true
        },
        bathrooms : {
            type : Number,
            required : true
        },
        furnished : {
            type : Boolean,
            required : true
        },
        parking : {
            type : Boolean,
            required : true
        },
        typeOfEstate : {
            type : String ,
            required : true
        },
        offer : {
            type : Boolean,
            required : true
        },
        imageUrls : {
            type : Array ,
            required : true
        },
        user : {
            type : String ,
            required : true
        }
} , {timestamps : true})



const Estate = mongoose.model("estates" , estateSchema)


module.exports = Estate