const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    fname:{
        type:String,
        required:true,
    },
    lname:{
        type:String,
        required:true,  
    },
    username:{
        type:String,
        required:true,
    },
  
    email:{
        type:String,
        required:true
    },
    password:{
    type:String,
    required:true
    },
    image:{
        type:String,
    },
    role:{
type:String,
enum:["Admin","User"],
default:"User"
    }
    
},{timestamps:true})
module.exports=mongoose.model('User',userSchema)