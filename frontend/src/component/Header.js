
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assest/logo.png";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import userService from "../services/userServices";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };
  
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };
  
  const handlePasswordChange = () => {
    if (newPassword === confirmNewPassword) {
      userService.updatePassword(newPassword).then((res) => {
        console.log(res);
        setShowPasswordPopup(false);
        message.success('Password updated successfully');
        handleLogout();
      });
    } else {
      toast.error('Passwords do not match');
    }
  }
  
  const cartItemNumber = useSelector((state) => state.product.cartItem);

  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-10">
            <img src={logo} className="h-full" />
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-7">
          <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
            <Link to={""}>Home</Link>
            {/* <Link to={"menu/63f0fdbb3bcc2f97fa53d25d"}>Menu</Link> */}
            <Link to={"about"}>About</Link>
            {/* <Link to={"contact"}>Contact</Link> */}
          </nav>
          <div className="text-2xl text-slate-600 relative">
            <Link to={"cart"}>
              <BsCartFill />
              <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center ">
                {cartItemNumber.length}
              </div>
            </Link>
          </div>
          <div className=" text-slate-600" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
              {userData.image ? (
                <img src={userData.image} className="h-full w-full" />
              ) : (
                <HiOutlineUserCircle />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2  shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <Link
                    to={"newproduct"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    New product
                  </Link>
                )}

               


                {(window.localStorage.getItem("token")) ?(
                  <>
                  <p
                    onClick={() => {
                      setShowPasswordPopup(true);
                      setShowMenu(false);
                    }}
                    className="cursor-pointer px-2"
                  >
                    Change Password
                  </p>
                  <p onClick={handleLogout} className="cursor-pointer px-2">
                    Logout 
                  </p>
                </>

                  
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    Login
                  </Link>
                )
                }
                <nav className="text-base md:text-lg flex flex-col md:hidden">
                  <Link to={""} className="px-2 py-1">
                    Home
                  </Link>
                  <Link
                    to={"menu/63f0fdbb3bcc2f97fa53d25d"}
                    className="px-2 py-1"
                  >
                    Menu
                  </Link>
                  <Link to={"about"} className="px-2 py-1">
                    About
                  </Link>
                  {/* <Link to={"contact"} className="px-2 py-1">
                    Contact
                  </Link> */}
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      
      {showPasswordPopup && (
  <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-gray-800">
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>
      <input
        type="password"
        placeholder="New Password"
        className="mb-2 px-2 py-1 border rounded-md w-full"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        className="mb-2 px-2 py-1 border rounded-md w-full"
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
      />
      <div className="flex justify-end">
        <button
          onClick={handlePasswordChange}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
        >
          Change Password
        </button>
        <button
          onClick={() => setShowPasswordPopup(false)}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

      
    </header>
  );
};

export default Header;
