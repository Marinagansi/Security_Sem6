import React, { useState ,useEffect} from "react";
import axios from "axios";
import loginSignupImage from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { BsEmojiSmileUpsideDown } from "react-icons/bs";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { toast } from "react-hot-toast";
import {message} from 'antd';
import userServices from "../services/userServices";


function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [image,setImage]=useState('')
  const [cpassword, setCPassword] = useState('')
  const [messages, setMessage] = useState('')
  const [valid, setValid] = useState('')
 
  // error
  const [fnameError, setFnameError] = useState('');
  const [lnameError, setLnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const Navigate=useNavigate()
 

  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    if (password !== cpassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  }, [password, cpassword]);

  const handleConfirmPasswordChange = (e) => {
    setCPassword(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();
     // Validate required fields
    if (!fname) {
      setFnameError('First Name is required');
      return;
    }
    if (!lname) {
      setLnameError('Last Name is required');
      return;
    }
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    if (!username) {
      setUsernameError('Username is required');
      return;
    }
    if (!passwordMatch) {
      setMessage('Password and confirm password do not match');
      return;
    }
    const formdata=new FormData();
    formdata.append('fname',fname)
    formdata.append('lname',lname)
    formdata.append('email',email)
    formdata.append('username',username)
    formdata.append('password',password)
    formdata.append('image',image)
    
    userServices.register(formdata)
    .then((response) => {
      console.log(response.data);
      message.success("Register Successfully");
      Navigate("/").catch((err) =>
      message.error("something went wrong")
        // window.alert(err.response.data.error)
      );
    }).catch((err) => {message.error(err.response.data.err)});

}

 useEffect(() => {
        if (password !== cpassword) {
            setValid('is-invalid')
            setMessage('password and confirm password does not match')
            return
        }
        setValid('is-valid')

    }, [cpassword, password])


 // Password complexity requirements
 const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

 // Password error message
 const [passwordError, setPasswordError] = useState("");

 // Function to handle password input change
 const handlePasswordChange = (e) => {
   const newPassword = e.target.value;
   setPassword(newPassword);

   if (!passwordRegex.test(newPassword)) {
     setPasswordError(
       "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
     );
   } else {
     setPasswordError("");
   }
 };
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((preve) => !preve);
  };



  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex  flex-col p-4">
        {/* <h1 className='text-center text-2xl font-bold'>Sign up</h1> */}
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative ">
          {/* <img src={data.image ? data.image :  loginSignupImage} className="w-full h-full" /> */}

          <label htmlFor="profileImage">
            <div className="absolute bottom-0 h-1/3  bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
              <p className="text-sm p-1 text-white">Upload</p>
            </div>
            <input type={"file"} id="profileImage" accept="image/*" className="hidden" onChange={(e) => setImage(e.target.files[0])}/>
          </label>
        </div>

        <form className="w-full py-3 flex flex-col">
          <label>First Name</label>
          <input
            type={"text"}
            id="firstName"
            name="firstName"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={fname}
            onChange={(e) => {setFname(e.target.value);
              setFnameError('')}}
            required
          />
           {fnameError && <p className="text-red-500 text-sm">{fnameError}</p>}

          <label >Last Name</label>
          <input
            type={"text"}
            id="lastName"
            name="lastName"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={lname}
            onChange={(e)=>setLname(e.target.value)}
           
            errorMessage=
            "Required"
          />
           {lnameError && <p className="text-red-500 text-sm">{lnameError}</p>}
           <label >UserName</label>
          <input
            type={"text"}
            id="userName"
            name="userName"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={username}
            onChange={(e)=>{
              setUsername(e.target.value);
              setUsernameError('');
            }}
            errorMessage=
            "Required"
          />
 {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}
          <label >Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value);
              setEmailError('');
            }}
            
           
          />
           {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

          <label>Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className=" w-full bg-slate-200 border-none outline-none "
              value={password}
              // onChange={(e)=>setPassword(e.target.value)}
              onChange={handlePasswordChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
          <label >Confirm Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2  focus-within:outline focus-within:outline-blue-300">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmpassword"
              name="confirmPassword"
              className=" w-full bg-slate-200 border-none outline-none "
              // value={data.confirmPassword}
              // onChange={handleOnChange}
              value={cpassword}
            onChange={handleConfirmPasswordChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          {!passwordMatch && (
          <p className="text-red-500 text-sm">Password and confirm password do not match</p>
        )}
          {/* {messages} */}

          <button className="w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4" onClick={handleRegister}>
            Sign up
          </button>
        </form>
        <p className="text-left text-sm mt-2">
          Already have account ?{" "}
          <Link to={"/login"} className="text-red-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
