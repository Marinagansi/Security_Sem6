const express=require('express')
const productController=require('../controller/product_controller')
const router=express.Router()
const upload=require('../middleware/upload')
const product=require('../models/product')

router.route('/')
.get(productController.getAllproduct)

.post(upload.single('product'),(req,res,next)=>{
   
    let uni={
        ...req.body,
        image:req.file.filename,
        
    }
    const file=req.file;
    if(file){
        const filename=req.file.filename;
        uni.image='/images/product_image/'+filename;
    }


    product.create(uni)
    .then(uni=>{
        res.status(201).json(uni)
    }).catch(next)
})


module.exports=router