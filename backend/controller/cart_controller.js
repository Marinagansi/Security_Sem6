const User = require('../models/user')
const Cart = require('../models/cart');

const addtocart= async function(req,res,next) {
  console.log(req.body)
    try {
      const {id, quantity, prices} = req.body;
      Cart.find({user:req.user._id})
      .then((cart) => 
      {
          cart = new Cart({
            product: id,
            user: req.user.userId,
            quantity: quantity,
            amount:prices
          })
          cart.save().then((cart) => {
            res.status(201).json({
              success: true,
              message: "Item added cart!",
              data: cart,
            });
          })
      });
      
    } catch (error) {
        res.status(500).json({  
            message: error.message, 
        })
    } 
}
const clearcart= async function(req,res,next){
  try {
    const productId = req.params.id;
    const userId = req.user.user._id;
    console.log(productId, userId);
    const response = await Cart.deleteOne().where("product").equals(productId).where("user").equals(userId);
    if (response.deletedCount > 0) {
      res.status(200).json({
        success: true,
        message: "Item Deleted Successfully!",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "This item is not in cart!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
}

const updatecart = async function (req, res) {
    try {
        const productId = req.params.id
        const userId =  req.user._id
        let updatedcart=await Cart.updateOne({productId, userId}, {quantity:req.body.quantity},{new:true})

        res.status(201).json({
            success:true,
            message: "Quantity Updated Succesfully!",
            // async and await ma return garne tarika
            data:updatedcart,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
} 


const deleteAllCartFromUser = (req, res, next)=>{
 Cart.deleteMany({user:req.params.id})
  .then((result)=>{
    if(result){
      res.status(200).json({
        success: true,
        message: 'Cart deleted successfully',
      });
    }else{
      res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }
  })
}

const getCartByUser =(req,res,next)=> {
  try{
    Cart.find({user:req.params.id})
    .populate('product')
    .populate('user')
   .then((cart)=> {
      console.log(cart)
      res.status(200).json({
        success: true,
        message: "List of Cart",
        data: cart

      })
    })

  }catch (error) {
    res.status(500).json({
        message: error.message
    })
}
}



const getcart = (req, res, next) => {

    Cart.findById(req.params.id)
    .populate('user')
    .populate('product')
      .then((cart) => {
          res.status(200).json({
              success: true,
              message: "List of products",
              data: cart
          });
      }).catch((err) => next(err));
}


module.exports = {
    addtocart,
    clearcart,
    updatecart,
    getCartByUser,
    getcart,
    deleteAllCartFromUser,
}
