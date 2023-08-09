// import React from "react";
// import { useState,useEffect } from "react";
// import { useSelector } from "react-redux";
// import CartProduct from "../component/cartProduct";
// import emptyCartImage from "../assest/empty.gif"
// import { toast } from "react-hot-toast";
// import {loadStripe} from '@stripe/stripe-js';
// import { useNavigate } from "react-router-dom";
// import cartServices from "../services/cartServices";

// const Carts = () => {
//   const [productCartItem, setProducts] = useState([]);

//   const [totalPrice, setTotalPrice] = useState(0);
//   const [totalQty, setTotalQty] = useState(0);

//   const user = useSelector(state => state.user)
//   const navigate = useNavigate()

  
//   useEffect(() => {
//     cartServices.getCartItems()
//       .then((response) => {
//         setProducts(response.data.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   useEffect(() => {
//     productCartItem.map(
//       (el) => 
//       (totalPrice += el.product.price * el.quantity)
//     )
//     setTotalPrice(totalPrice);
//   }, [productCartItem]);
  
//   const handlePayment = async()=>{
  

//       if(user.email){
          
//           const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
//           const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/create-checkout-session`,{
//             method : "POST",
//             headers  : {
//               "content-type" : "application/json"
//             },
//             body  : JSON.stringify(productCartItem)
//           })
//           if(res.statusCode === 500) return;

//           const data = await res.json()
//           console.log(data)

//           toast("Redirect to payment Gateway...!")
//           stripePromise.redirectToCheckout({sessionId : data}) 
//       }
//       else{
//         toast("You have not Login!")
//         setTimeout(()=>{
//           navigate("/login")
//         },1000)
//       }
    
//   }
//   return (
//     <>
    
//       <div className="p-2 md:p-4">
//         <h2 className="text-lg md:text-2xl font-bold text-slate-600">
//           Your Cart Items
//         </h2>

//         {productCartItem.length > 0 ?
//         <div className="my-4 flex gap-3">
//           {/* display cart items  */}
//           <div className="w-full max-w-3xl ">
//             {productCartItem.map((el) => {
//               return (
//                 console.log("hi  ", el),
//                 <CartProduct
//                   key={el.product._id}
//                   id={el.product._id}
//                   name={el.product.name}
//                   image={"http://localhost:3000" + el.product.image}
//                   category={el.product.category}
//                   qty={el.quantity}
//                   total={el.product.price}
//                   price={el.product.price * el.quantity}
//                 />
//               );
//             })}
//           </div>

//           {/* total cart item  */}
//           <div className="w-full max-w-md  ml-auto">
//             <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
//             <div className="flex w-full py-2 text-lg border-b">
//               <p>Total Qty :</p>
//               <p className="ml-auto w-32 font-bold">{totalQty}</p>
//             </div>
//             <div className="flex w-full py-2 text-lg border-b">
//               <p>Total Price</p>
//               <p className="ml-auto w-32 font-bold">
//                 {/* <span className="text-red-500">₹</span> */}
//                  {totalPrice}
//               </p>
//             </div>
//             <button className="bg-red-500 w-full text-lg font-bold py-2 text-white" onClick={handlePayment}>
//               Payment
//             </button>
//           </div>
//         </div>

//         : 
//         <>
//           <div className="flex w-full justify-center items-center flex-col">
//             <img src={emptyCartImage} className="w-full max-w-sm"/>
//             <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
//           </div>
//         </>
//       }
//       </div>
    
//     </>
//   );
// };

// export default Carts;
