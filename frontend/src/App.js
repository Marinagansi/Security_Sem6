import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import {Link, Route, Routes, useMatch } from "react-router-dom";
import Home from "./page/Home";
import Menu from "./page/Menu";
import About from "./page/About";
import Contact from "./page/Contact";
import Login from "./page/login";
import Newproduct from "./page/Newproduct";
import Signup from "./page/Signup";
import { store } from "./redux/index";
import { Provider } from "react-redux";
import Cart from "./page/Cart";
import Success from "./page/Success";
import Cancel from "./page/Cancel";
import Header from "./component/Header";
import { Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { setDataProduct } from "./redux/productSlide";
import { useDispatch, useSelector } from "react-redux";
import Users from './page/Admin/User';
import Forms from './page/Admin/jewel/form';
import Product from './page/Admin/jewel/index';

function App() {

  const [product, setProduct] = useState([])

  const match=useMatch('/menu/:id')
  
  const prod=match
                ?product.find(b=>b._id===match.params.id)
                :null
 
  // const dispatch = useDispatch()
  // const productData = useSelector((state)=>state.product)
 
  // useEffect(()=>{
  //   (async()=>{
  //     const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/product`)
  //     const resData = await res.json()
  //     dispatch(setDataProduct(resData))
  //   })()
  // },[])

  return (
    <>
   <Routes>
   <Route exact path="forms" element={<Forms/>} />
   <Route path="users" element={<Users/>} />
    
    <Route exact path="product" element={<Product/>} />
   </Routes>
        <Header />
    <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
    <Routes>
    
<Route path="/" element={<App />}/>
      <Route index element={<Home product={product} setProducts={setProduct} />} />
      {/* <Route path="menu" element={<Menu />} /> */}
      <Route path="menu/:id" element={<Menu prod={prod} />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Login />} />
      <Route path="newproduct" element={<Newproduct />} />
      <Route path="signup" element={<Signup />} />
      <Route path="cart" element={<Cart />} />
      <Route path="success" element={<Success/>}/>
      <Route path="cancel" element={<Cancel/>}/>
      <Route path="logins" element={<Users/>} />
     
              {/* admin page */}
       
       
  
    </Routes>
      {/* <Toaster />
      <div>
        <Header />
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div> */}
      </main>
    </>
  );
}

export default App;
