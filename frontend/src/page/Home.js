import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CardFeature from "../component/CardFeature";
import HomeCard from "../component/HomeCard";
import { GrPrevious, GrNext } from "react-icons/gr";
import FilterProduct from "../component/FilterProduct";
import AllProduct from "../component/AllProduct";
import productServices from "../services/productServices";
import "../style/Home.css";

import Footer from "../component/Footer/footer";

const Home = ({ product, setProducts }) => {
  // const [product, setProducts] = useState([]);
  const [types, settype] = useState([]);

  useEffect(() => {
    productServices
      .getAllproduct()
      .then((response) => {
        setProducts(response.data.data);
        settype(response.data.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  // const productData = useSelector((state) => state.product.productList);
  // const homeProductCartList = productData.slice(1, 5);
  // const homeProductCartListVegetables = product.filter(
  //   (el) => el.types === "bangle",
  //   []
  // );

  const homeProductCartListVegetables = product
    ? product.filter((el) => el.types === "necklaces")
    : [];
  const products = product
    ? product.filter((el) => el.types === "necklace")
    : [];
  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  return (
    <div className="p-2 md:p-4 homs">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2">
          <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
            {/* <p className="text-sm font-medium text-slate-900"> Delivery</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
              className="h-7"
            /> */}
          </div>
          <h2 className="heading">
           
            <span className="subHeading">Unleash Your Elegance: Adorn with Timeless Brilliance!</span>
            Wildest Range of Diamond Jewellery{" "}
          </h2>
          <p className="py-3 text-base ">
            "Discover Your Sparkle: Embrace the Brilliance of Timeless Elegance
            at Our Exquisite Jewelry Emporium! From Dazzling Diamonds to
            Mesmerizing Gemstones, Find Your Signature Style and Illuminate
            Every Moment with Grace and Glamour. Unveil the Beauty of Artisan
            Craftsmanship and Unforgettable Designs that Radiate a Captivating
            Aura. Your Journey to Timeless Glamour Starts Here – Unleash Your
            Inner Brilliance at Our Jewelry Shop!"
          </p>
          <button className="font-bold bg-brown-500 text-slate-200 px-4 py-2 rounded-md ordersbtn">
            Order Now
          </button>
        </div>

        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          {products[0]
            ? // homeProductCartList[0]
              products.map((el) => {
                return (
                  <HomeCard
                    key={el._id}
                    id={el._id}
                    image={"http://localhost:3000" + el.image}
                    name={el.price}
                  />
                );
              })
            : loadingArray.map((el, index) => {
                return (
                  <HomeCard key={index + "loading"} loading={"Loading..."} />
                );
              })}
        </div>
      </div>

      <div className="">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-slate-800 mb-4">Bangles</h2>
          <div className="ml-auto flex gap-4">
            <button
              onClick={preveProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded "
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {homeProductCartListVegetables[0]
            ? homeProductCartListVegetables.map((el) => {
                return (
                  <CardFeature
                    key={el._id}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={"http://localhost:3000" + el.image}
                  />
                );
              })
            : loadingArrayFeature.map((el, index) => (
                <CardFeature loading="Loading..." key={index + "cartLoading"} />
              ))}
        </div>
      </div>

      <AllProduct heading={"Your Product"} productData={types} />
      <Footer />
    </div>
  );
};

export default Home;
