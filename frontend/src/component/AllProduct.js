import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardFeature from "./CardFeature";
import FilterProduct from "./FilterProduct";
import productServices from "../services/productServices";

const AllProduct = ({ heading ,}) => {
  
  const [product, setProduct] = useState([])
  useEffect(()=>{
    productServices.getAllproduct().
     then (response=>{
       
       setProduct(response.data.data);
    
          console.log(response.data)
     }).catch(err=>console.log(err))
   },[])

  const productData = useSelector((state) => state.product.productList);
  const categoryList = [...new Set(productData.map((el) => el.types))];

  //filter data display
  const [filterby, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (types) => {
    setFilterBy(types)
    const filter = product.filter(
      (el) => el.types.toLowerCase() === types.toLowerCase()
    );
    setDataFilter(() => {
      return [...filter];
    });
  };

  const loadingArrayFeature = new Array(10).fill(null);

  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl text-slate-800 mb-4">{heading}</h2>

      {/* <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
        {categoryList[0] ? (
          categoryList.map((el) => {
            return (
              <FilterProduct
                category={el}
                key={el}
                isActive={el.toLowerCase() === filterby.toLowerCase()}
                onClick={() => handleFilterProduct(el)}
              />
            );
          })
        ) : (
          <div className="min-h-[150px] flex justify-center items-center">
            <p>Loading...</p>
          </div>
        )}
      </div> */}

      <div className="flex flex-wrap justify-center gap-4 my-4">
        { product[0]
          ?  product.map((el) => {
              return (
                <CardFeature
                  key={el._id}
                  id={el._id}
                  image={"http://localhost:3000" + el.image}
                  name={el.name}
                  category={el.types}
                  price={el.price}
                />
              );
            })
          : 
          loadingArrayFeature.map((el,index) => (
              <CardFeature loading="Loading..." key={index+"allProduct"} />
            ))}
      </div>
    </div>
  );
};

export default AllProduct;
