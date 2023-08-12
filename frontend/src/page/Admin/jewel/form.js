import React, { useState, useEffect } from "react";
import DashboardHeader from "../../../component/Admin/DashboardHeader";
import "../styles.css";
import SideBar from "../../../component/Admin/Sidebar";
import sidebar_menu from "../../../component/Admin/constants/sidebar-menu";
// import { Form, FormGroup, FormFeedback } from "reactstrap";
import { App, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import productService from "./Productservice";

import { toast } from 'react-hot-toast'
import {BsCloudUpload} from "react-icons/bs"
import { ImagetoBase64 } from '../../../utility/ImagetoBase64'

function Forms() {

  const [name, setname] = useState('')
  const [category, setcategory] = useState('')
  const [price, setPrice] = useState('')
  const [description, setdescription] = useState('')
  const [product, setproduct] = useState('')
 

  const Navigate = useNavigate();

  // }

  const handleSubmits = (e) => {
    console.log("ll");
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", name);
  formdata.append("types", category);
  formdata.append("product", product);
  formdata.append("price", price);
  formdata.append("overview", description);
    productService.adduni(formdata).then((response) => {
      console.log(response.data);
      message.success("Your product has been added");
      Navigate("/forms")
    }).catch((err) =>
    window.alert(err.response.data.error)
  );
  };
  return (
    <div className="dashboard-container">
      <SideBar menu={sidebar_menu} />
      <div className="dashboard-content">
        <Link to="/forms">
          {" "}
          <DashboardHeader btnText="Add Product" />
        
        </Link>
        <div className="p-4">
       <form className='m-auto w-full max-w-md  shadow flex flex-col p-3 bg-white'>
        <label >Name</label>
        <input type="text" name="name" className='bg-slate-200 p-1 my-1' onChange={(e) => {setname(e.target.value)}}  value={name}/>

        <label htmlFor='category'>Category</label>
        <select className='bg-slate-200 p-1 my-1' id='category' name='category'  onChange={(e) => {setcategory(e.target.value)}}  value={category}>
          <option value={"other"}>select category</option>
          <option value={"necklace"}>Necklace</option>
          <option value={"Bangle"}>Bangle</option>
          <option value={"locket"}>Locket</option>
        
        </select>

        <label htmlFor="image">Image
        <div  className='h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer'>
            {
             product ? <img src={URL.createObjectURL(product)} className="h-full" /> :<span className='text-5xl'><BsCloudUpload/></span> 
            }
            
               <input
                type="file"
                placeholder="Image"
                name="product"
                
                onChange={(e) => {setproduct(e.target.files[0])}} 
                required  
              />
           {/* <input type="file" accept="image/*" id="image" onChange={handleOnChange} className="hidden"/> */}
        </div>
        </label>
        

        <label  className='my-1'>Price</label>
        <input type="text" className='bg-slate-200 p-1 my-1' name='price' onChange={(e) => {setPrice(e.target.value)}} value={price}/>

        {/* <label htmlFor='description'>Description</label>
        <textarea rows={2} value={data.description} className='bg-slate-200 p-1 my-1 resize-none' name='description' onChange={handleOnChange}></textarea> */}

        <button className='bg-brown-500 hover:bg-brown-600 text-white text-lg font-medium my-2 drop-shadow' onClick={handleSubmits} style={{"backgroundColor":"rgb(47, 27, 2)"}}>Save</button>
       </form>
    </div>
      </div>
    </div>
  );
}

export default Forms;
