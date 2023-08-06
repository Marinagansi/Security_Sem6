const product=require('../models/product')

const getAllproduct=(req,res, next)=>{
    product.find()
    .then((p)=>{
        res.status(200).json({
            success: true,
            message: "List of products",
            data: p,})
    }).catch( (err) => {
        res.status(500).json({
            success: false,
            message: err,
        });
    });
}
module.exports={
    getAllproduct
    }