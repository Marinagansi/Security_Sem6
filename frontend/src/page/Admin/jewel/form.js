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
  const [data,setData] = useState({
    name : "",
    category : "",
    image : "",
    price : "",
    description : ""
  })
  const [name, setname] = useState("");
  const [overview, setoverview] = useState("");
  const [location, setlocation] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [types, settypes] = useState("");
  const [fees, setfees] = useState("");
  const [major, setmajor] = useState("");
  const [admission, setadmission] = useState("");
  const [link, setlink] = useState("");
  const [uni, setimage] = useState("");

  const Navigate = useNavigate();
  const handleOnChange = (e)=>{
    const {name,value} = e.target

    setData((preve)=>{
        return{
          ...preve,
          [name] : value
        }
    })

  }

  const uploadImage = async(e)=>{
      const data = await ImagetoBase64(e.target.files[0])
      // console.log(data)

      setData((preve)=>{
        return{
          ...preve,
          image : data
        }
      })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(data)

    const {name,image,category,price} = data

    if(name && image && category && price){
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/uploadProduct`,{
        method : "POST",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })
  
      const fetchRes =  await fetchData.json()
  
      console.log(fetchRes)
      toast(fetchRes.message)

      setData(()=>{
        return{
          name : "",
          category : "",
          image : "",
          price : "",
          description : ""
        }
      })
    }
    else{
      toast("Enter required Fields")
    }
    
   
  }

  const handleSubmits = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("uni", uni);
    formdata.append("name", name);
    formdata.append("overview", overview);
    formdata.append("location", location);
    formdata.append("phone", phone);
    formdata.append("email", email);
    formdata.append("types", types);
    formdata.append("fees",fees);
    formdata.append("major", major);
    formdata.append("admission", admission);
    formdata.append("link", link);
    productService.adduni(formdata).then((response) => {
      console.log(response.data);
      message.success("Your product has been added");
      Navigate("/adduni")
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
          <DashboardHeader btnText="Add College" />
        
        </Link>
        <div className="p-4">
       <form className='m-auto w-full max-w-md  shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type={"text"}  name="name" className='bg-slate-200 p-1 my-1' onChange={handleOnChange} value={data.name}/>

        <label htmlFor='category'>Category</label>
        <select className='bg-slate-200 p-1 my-1' id='category' name='category' onChange={handleOnChange} value={data.category}>
          <option value={"other"}>select category</option>
          <option value={"fruits"}>Fruits</option>
          <option value={""}>Vegetable</option>
          <option value={"icream"}>Icream</option>
          <option value={"dosa"}>Dosa</option>
          <option value={"pizza"}>Pizza</option>
          <option value={"rice"}>rice</option>
          <option value={"cake"}>Cake</option>
          <option value={"burger"}>Burger</option>
          <option value={"panner"}>Panner</option>
          <option value={"sandwich"}>Sandwich</option>
        </select>

        <label htmlFor='image'>Image
        <div  className='h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer'>
            {
              data.image ? <img src={data.image} className="h-full" /> :<span className='text-5xl'><BsCloudUpload/></span> 
            }
            
            
           <input type={"file"} accept="image/*" id="image" onChange={uploadImage} className="hidden"/>
        </div>
        </label>
        

        <label htmlFor='price' className='my-1'>Price</label>
        <input type={"text"} className='bg-slate-200 p-1 my-1' name='price' onChange={handleOnChange} value={data.price}/>

        <label htmlFor='description'>Description</label>
        <textarea rows={2} value={data.description} className='bg-slate-200 p-1 my-1 resize-none' name='description' onChange={handleOnChange}></textarea>

        <button className='bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow'>Save</button>
       </form>
    </div>
      </div>
    </div>
  );
}

export default Forms;
