import React, { useEffect, useState} from "react";
import { MdClose } from "react-icons/md";
import cartService from "../services/cartServices";
import {message} from "antd";
import cartProduct from "../style/cartProduct.css";

const CartProduct = ({cartItems,setCartItems}) => { 

    const handleRemoveItemFromCart = async (product) => {
        console.log(product);
        cartService.deleteCartItems(product._id).then((response) => {
            console.log(response);
            message.success("Item removed from cart");
            const newCartItems = cartItems.filter((item) => item.product._id !== product._id);
            setCartItems(newCartItems);    
        }
        ).catch((err) => {
            console.log(err);
            message.error("Something went wrong");
        }
        )

    };

    return (
        
        <div className="cart-products">
            {cartItems?.map((item) => (
                <div
                    className="search-result-item"
                    key={item.product._id}
                    onClick={() => {}}
                >
                    <div className="image-container">
                        <img
                            src={
                                "http://localhost:3000" + item.product.image
                            }
                        />
                    </div>
                    <div className="prod-details">
                        <span className="name">{item.product.name}</span>
                        <MdClose
                            className="close-btn"
                            onClick={() => handleRemoveItemFromCart(item.product)}
                        />
                        
                        <div className="text">
                            Quantity:{" "}
                            <span className="highlight">
                                {item.quantity}
                            </span>
                          
                        </div>
                        
                        <div className="text">
                           
                            <span className="highlight">
                                Rs.
                                
                                {item.amount}
                                
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CartProduct;