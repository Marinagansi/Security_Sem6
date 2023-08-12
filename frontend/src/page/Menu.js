import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AllProduct from "../component/AllProduct";
import { addCartItem } from "../redux/productSlide";

const Menu = ({prod}) => {
  console.log(prod)
  const { filterby } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const productData = useSelector((state) => state.product.productList);

  // const productDisplay = productData.filter((el) => el._id === filterby)[0];

  const handleAddCartProduct = (e) => {
    dispatch(addCartItem(prod))
  };

  const handleBuy = ()=>{
    dispatch(addCartItem(prod))
      navigate("/cart")
  }
  return (
    <div className="p-2 md:p-4">
      <div className="w-full max-w-4xl m-auto md:flex bg-white">
        <div className="max-w-sm  overflow-hidden w-full p-5">
          <img
            src={"http://localhost:3000"+prod.image}
            className="hover:scale-105 transition-all h-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-slate-600  capitalize text-2xl md:text-4xl">
            {prod.name}
          </h3>
          <p className=" text-slate-500  font-medium text-2xl">{prod.category}</p>
          <p className=" font-bold md:text-2xl">
        
            <span>{prod.price}</span>
          </p>
          <div className="flex gap-3">
          <button onClick={handleBuy} className="bg-brown-500 py-1 mt-2 rounded hover:bg-brown-600 min-w-[100px]" style={{"backgroundColor":"rgb(40, 23, 2)","color":"white"}}>Buy</button>
          <button onClick={handleAddCartProduct} className="bg-brown-500 py-1 mt-2 rounded hover:bg-brown-600 min-w-[100px]"  style={{"backgroundColor":"rgb(47, 27, 2)","color":"white"}}>Add Cart</button>
          </div>
          <div>
            <p className="text-slate-600 font-medium">Description : </p>
            <p>{prod.overview}</p>
          </div>
        </div>
      </div>

      <AllProduct heading={"Related Product"}/>
    </div>
  );
};

export default Menu;
