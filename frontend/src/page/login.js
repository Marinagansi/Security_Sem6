import React, { useState ,useEffect} from "react";
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
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState({
   email: "",
    password: "",
  });
  const navigate = useNavigate()  
  const userData = useSelector(state => state)


  const dispatch = useDispatch()
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  const [verificationCode, setVerificationCode] = useState('');
  const [iscodesent, setIscodesent] = useState(false);
 
  const[iscodeverified, setIscodeVerified] = useState(false);
  const[token, setToken] = useState('');

  const maxLoginAttempts = 3; // Maximum number of allowed login attempts
  const lockoutDuration = 60 * 5; // Lockout duration in seconds (5 minutes )
  

  const handleCodeChange = (event) => {
    setVerificationCode(event.target.value);
  };

  useEffect(() => {
    // Check if a valid session exists in local storage on component mount
    const checkSession = () => {
      const expirationTime = localStorage.getItem('expirationTime');
      if (expirationTime && new Date().getTime() < parseInt(expirationTime, 10)) {
        setIsLoggedIn(true);
      }
    };

    checkSession();
  }, []);

  const handleVerifyCode = (event) => {
    event.preventDefault();

    if (!verificationCode) {
      message.warning('Please enter the verification code');
      return;
    }

    const storedCode = localStorage.getItem('verificationCode');

    if (verificationCode === storedCode) {
      message.success('Verification code is correct');
      setIscodeVerified(true);
      navigate('/');
    } else {
      message.error('Invalid verification code');
    }
  };
  const handleSignin = (e) => {
    const generateCode = Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem('verificationCode', generateCode.toString());
   
   
      e.preventDefault(); // Prevent the default form submission behavior
  
      const loginData = {
          email: data.email,
          password: data.password,
          code:generateCode
      };
  
      const failedAttempts = JSON.parse(localStorage.getItem('failedLoginAttempts')) || {};
      const attemptsForUser = failedAttempts[loginData.email] || 0;
      const lockedOutUntil = JSON.parse(localStorage.getItem('lockedOutUntil')) || {};
      // Check if the account is locked out
      if (attemptsForUser >= maxLoginAttempts) {

          const lockoutTime = lockedOutUntil[loginData.email] || 0;
          const currentTime = Math.floor(Date.now() / 1000);
          if (lockoutTime > currentTime) {
              const remainingLockoutTime = lockoutTime - currentTime;
              return message.error(`Account locked. Try again in ${remainingLockoutTime} seconds.`);
          } else {
              // Reset the failed attempts if the lockout duration has passed
              delete failedAttempts[loginData.email];
              delete lockedOutUntil[loginData.email];
              localStorage.setItem('failedLoginAttempts', JSON.stringify(failedAttempts));
              localStorage.setItem('lockedOutUntil', JSON.stringify(lockedOutUntil));
         
              const sessionDuration = 2 * 60 * 1000; // 2 minutes in milliseconds
              const expirationTime = new Date().getTime() + sessionDuration;
          
              localStorage.setItem('expirationTime', expirationTime);
              setIsLoggedIn(true);
            }
      }
  
      // Check if both the email and password are provided
      if (!loginData.email || !loginData.password) {
          return message.error("Please fill all the fields");
      }
  
      // Check if the email and password are both "admin"
      // If true, navigate to "/adduni" route
     else {
          // If the email and password are not "admin",
          // call the "login" function from the "userServices" module
          // and attempt to log in the user
          userServices.login(loginData)
              .then(response => {
                  console.log(response.data);
                  if (response.data.role === 'Admin') {
                    navigate('/forms');
                    window.localStorage.setItem('token', response.data.token);
                    message.success('Login Successful');
                    navigate('/forms');
                 
                }
                else if(response.data.role === 'User'){
                  // If login is successful, save the JWT token in local storage
                  setToken(response.data.token);
                  window.localStorage.setItem('token', response.data.token)
                  window.localStorage.setItem('id', response.data.id)
                  setIscodesent(true);
                  delete failedAttempts[loginData.email];
                  localStorage.setItem('failedLoginAttempts', JSON.stringify(failedAttempts));
      } })
              .catch(err => {
                  // Increment failed login attempts for the user
                  failedAttempts[loginData.email] = (failedAttempts[loginData.email] || 0) + 1;
                  localStorage.setItem('failedLoginAttempts', JSON.stringify(failedAttempts));
  
                  // Lock the account if the maximum attempts are reached
                  if (failedAttempts[loginData.email] >= maxLoginAttempts) {
                      const currentTime = Math.floor(Date.now() / 1000);
                      const lockoutTime = currentTime + lockoutDuration;
                      lockedOutUntil[loginData.email] = lockoutTime;
                      localStorage.setItem('lockedOutUntil', JSON.stringify(lockedOutUntil));
                      return message.error(`Account locked. Try again in ${lockoutDuration} seconds.`);
                  } else {
                      return message.error(err.response.data.err);
                  }
              });
      }
  }
  

  return (
    <>
    {!iscodesent ? (
      
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
          value={data.email}
          onChange={(e)=>setData({...data,email:e.target.value})}

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

    ):(
      <div className="verify-container">
        <form onSubmit={handleVerifyCode}>
          <h1>Verify your email</h1>
          <input
            type="text"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button type="submit">Verify</button>
        </form>



      </div>
  )
  }
    </>
  );
}

export default Login