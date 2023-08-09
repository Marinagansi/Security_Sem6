import React from "react";
import { useDispatch } from "react-redux";
import { Link ,useNavigate} from "react-router-dom";
import { addCartItem,increaseQty } from "../redux/productSlide";
import cartServices from "../services/cartServices";
import '../style/Home.css'

const CardFeature = ({ image, name, price, category, loading, id }) => {
  const dispatch = useDispatch()
  

  const quantity = 1;
  const prices=200;

  const handleAddCartProduct = ({id,quantity,prices}) => {
    console.log({id,quantity,prices});
    cartServices.addtocart({id,quantity,prices})
        .then((res) => {
          alert("Product Added to Cart");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

    dispatch(addCartItem({
      _id : id,
      name : name,
      price : price,
      category : category,
      image : image
    }))
  };

 
    const navigate = useNavigate();
  
  
    const logout = () => {
      window.localStorage.removeItem("token");
        navigate("/signup");
      
    }
    // const Button=()=>{
    //   if (window.localStorage.getItem("token")) {
    //     return (
    //       <button
    //         className="btn1"
    //         onClick={handleAddCartProduct(id, quantity,price)}
    //       >
    //         Add Cart
    //       </button>
    //     );
    //   }
    //   else {
    //     return (
    //       <button className="btn1"onClick={logout}
    //     >Add Cart</button>
    //     );
    //   }
      
    // }
    
  return (
    <div className="w-full min-w-[200px] max-w-[200px] bg-white hover:shadow-lg drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col ">
      {image ? (
        <>
          <Link
            to={`/menu/${id}`}
            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
          >
            <div className="h-28 flex flex-col justify-center items-center">
              <img src={image} className="h-full" />
            </div>
            <h3 className="font-semibold text-slate-600  capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">
              {name}
            </h3>
            <p className=" text-slate-500  font-medium">{category}</p>
            <p className=" font-bold">
              {/* <span className="text-red-500">₹</span> */}
              <span>{price}</span>
            </p>
          </Link>
          <button
            className="btn1"
            onClick={()=>handleAddCartProduct({id, quantity,prices})}
          >
            Add Cart
          </button>
          {/* <button
            className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 w-full"
            onClick={handleAddCartProduct}
          >
            Add Cart
          </button> */}
        </>
      ) : (
        <div className="min-h-[150px] flex justify-center items-center">
          <p>{loading}</p>
        </div>
      )}
    </div>
  );
};

export default CardFeature;
