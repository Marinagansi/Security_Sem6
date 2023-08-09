const { model } = require('mongoose')
const express=require('express')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const router =express.Router()
const User=require('../models/user')
const mailService=require('../controller/mailService')




const register=((req, res, next)=>{
    User.findOne({username:req.body.username})
    .then(user=>{
        if(user!=null){
            let err=new Error(`User ${req.body.username} already exists.`)
            res.status (400)
            return next(err)
        }
        bcrypt.hash(req.body.password,10,(err,hash)=>{
            if(err) return next(err)
        
            user=new User({
                fname:req.body.fname,
                lname:req.body.lname,
                username:req.body.username,
                email:req.body.email,
                password: hash
        
           })
        
        // Add image to student
        const file = req.file;
        if (file) {
            const fileName = req.file.filename;
            user.image = '/images/user_image/' + fileName;
        }

    //if(req.body.role) user.role=req.body.role
        user.save().then(user=>{
                res.status(201).json({
                    'status0':'succesful',
                    success:true,
                    message:"Student registered succesfully",
                    data:user
                })
            }).catch(next);
        
        })
    }).catch(next);
})


const login=(req,res, next)=>{
    const {email, code}=req.body;
    mailService.sendVerificationCode(email, code)
    

    User.findOne({email:req.body.email})
    .then(user=>{
        if(user == null){
            let err=new Error(`User ${req.body.email} has not register`)
            res.status(404)
            return next(err)
        }
        bcrypt.compare(req.body.password, user.password,
             (err, status)=>{
                if(err)return next(err)
                if(!status){
                    let err=new Error('password does not match')
                    res.status(401)
                    return next(err)
                }
                let data ={
                    userId: user._id, 
                    email: user.email,
                    role:user.role
                }
                jwt.sign(data, process.env.SECRET,
                     {'expiresIn':'3d'},(err,token)=>{
                        if(err) return next(err)
                        res.status(200).json({
                        success:true,
                        message:'login successful',
                        token:token , 
                        id:user._id,  
                                   })
                     })
                
             })
        
    }).catch(next)
    
}

//get all user
const getAlltUser=(req, res) => {
    User.find()
        .then(
            (user) => {
                res.status(200).json({
                    success: true,
                    message: "List of users",
                    data: user,
                });
            }
        ).catch(
            (err) => {
                res.status(500).json({
                    success: false,
                    message: err,
                });
            }
        ); // or go to model class and set select:false
};




module.exports={
    register,
    login,
    getAlltUser,

}