import React, { useState } from "react";
import loginSignupImage from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import { BsEmojiSmileUpsideDown } from "react-icons/bs";
import {toast} from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";
import userServices from "../services/userServices";
import {message} from 'antd';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
   username: "",
    password: "",
  });
  const navigate = useNavigate()  
  const userData = useSelector(state => state)


  const dispatch = useDispatch()




  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  const handleSignin = (e) => {
    e.preventDefault();
    if (!data.username || !data.password) {
        return message.error("please fill all the fields")
    }
    
    if (data.username==="admin" || data.password==="admin") {
        return navigate("/adduni")
    }
    else{
  userServices.login(data)
    .then(response=>{
        console.log(response.data)
        window.localStorage.setItem('token', response.data.token)
        message.success("login successful")
        
        navigate('/')
    }).catch(err => message.error(err.response.data.err))
}
}


  return (
    <div className="p-3 md:p-4">
    <div className="w-full max-w-sm bg-white m-auto flex  flex-col p-4">
      {/* <h1 className='text-center text-2xl font-bold'>Sign up</h1> */}
      <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
        <img src={loginSignupImage} className="w-full" />
      </div>

      <form className="w-full py-3 flex flex-col" >
        <label htmlFor="email">Email</label>
        <input
          type={"email"}
          id="email"
          name="email"
          className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
          value={data.username}
          onChange={(e)=>setData({...data,username:e.target.value})}

        />

        <label htmlFor="password">Password</label>
        <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className=" w-full bg-slate-200 border-none outline-none "
            value={data.password}
            onChange={(e)=>setData({...data,password:e.target.value})}
          />
          <span
            className="flex text-xl cursor-pointer"
            onClick={handleShowPassword}
          >
            {showPassword ? <BiShow /> : <BiHide />}
          </span>
        </div>

        <button className="w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4"
        onClick={handleSignin}>
          Login
        </button>
      </form>
      <p className="text-left text-sm mt-2">
        Don't  have account ?{" "}
        <Link to={"/signup"} className="text-red-500 underline">
          Sign Up
        </Link>
      </p>
    </div>
  </div>
  )
}

export default Login