const express=require('express')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const router =express.Router()
const User=require('../models/user')
const user_controller=require('../controller/user_controller')
const uploadOptions = require('../middleware/uploaduser')
const { verifyUser , VerifyAdmin}=require('../middleware/auth')


router.route("/").get(user_controller.getAlltUser);
router.route('/register')
.post(uploadOptions.single('image'),user_controller.register)

//to fetch all student
router.route('/')
.get(user_controller.getAlltUser)
// for login user
router.route('/login')
.post(user_controller.login)

router.route('/:id')
 .put(verifyUser,user_controller.updateUser)


router.get('/profile', verifyUser, async (req, res) =>{
    try{
        await User.findById({_id:req.user.userId})
        .then(
            (user) => {
                res.status(200).json({
                    success: true,
                    message: "user details",
                    data: user,
                });
            })
    }catch(error){
        console.log(error.message)
    }
});
module.exports=router