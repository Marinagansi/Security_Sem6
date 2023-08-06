const mongoose = require('mongoose')

const productSchema=mongoose.Schema({
    overview:{
        type:String,
        reuqired:true,
    },
    name:{
        type:String,
        required:true,
    },
    size:{
        type:String,
        required:true,
    },
    material:{
        type:String,
        required:true,
    },
    quantity:{
        type:String,
        required:true,
    },
    types:{
        type:String,
        required:true,
    },
   
    price:{
        type:String,
        requied:true
    },
    image:{
        type:String,   
        required:true,
    },
   

})
module.exports = mongoose.model('product',productSchema)