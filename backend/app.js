require('dotenv').config()
const cors=require('cors')
const express =require("express")
const app=express()
app.use(cors())
const mongoose=require('mongoose')
const path = require("path");
const users_routes=require('./routes/user-route')
const product_routes=require('./routes/product_route')
port =3000

mongoose.connect('mongodb://127.0.0.1:27017/jewel')
    .then(() => {
        console.log('connected to mongodb server')
        app.listen(port, () => {
            console.log(`App is running on port: ${port}` ) 
        })
    }).catch((err) => console.log(err))


//1. aplication level middleware
app.use((req,res,next)=>{
    console.log(`${req.method} ${req.path}`)
    next()
})

//2. express defined middleware
app.use(express.json())

app.use(
    "/images",
    express.static(path.join(__dirname, "/images"))
);
//3. Router level middleware
app.use('/users',users_routes)
app.use('/product',product_routes)


//4.error handle middleware
app.use((err, req,res,nex )=>{
    console.log(err.stack)
    if(res.statusCode==200)res.status(500)
    res.json({"err":err.message})
})
module.exports=app
//npm run dev