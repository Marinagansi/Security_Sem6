import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import { message } from "antd";
import CartProduct from "../component/cartProduct";
import cartServices from "../services/cartServices";
import orderServices from "../services/orderServices";
import cart from "../style/cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    cartServices.getCartItems().then((response) => {
      setCartItems(response.data.data);
    });
  }, []);

  useEffect(() => {
    let subTotal = 0;
    cartItems.map((item) => (subTotal += item.amount));
    setCartSubTotal(subTotal);
  }, [cartItems]);

  const handleOrder = async () => {
    orderServices
      .addorder({
        user: window.localStorage.getItem("id"),
        products: cartItems.map((item) => item.product._id),
        amount: cartSubTotal,
        quantity: cartItems.map((item) => item.quantity),
      })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          message.success("Order placed successfully");
        }
        cartServices.clearcart().then((response) => {
          console.log(response);
        });
        setCartItems([]);
      });
  };

  return (
    <>
      <div className="cart-panel p-2 md:p-4">
        <div className="cart-content">
          <div className="cart-header text-lg md:text-2xl font-bold text-slate-600">
            <span className="heading">Shopping Cart</span>
          </div>

          {!cartItems.length && (
            <div className="empty-cart">
              <BsCartX />
              <span>No products in the cart.</span>
            </div>
          )}
          <div className="w-full max-w-3xl">
            {!!cartItems.length && (
              <>
                <CartProduct
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                />
                <div className="cart-footer">
                  <div className="subtotal">
                    <span className="text">Subtotal:</span>
                    <span className="text total">{cartSubTotal}</span>
                  </div>
                  <div className="subtotal">
                    <span className="text">Address</span>
                    <input
                      placeholder=""
                      style={{
                        border: "1px solid black",
                        padding: "10px",
                        borderRadius: "4px",
                        fontSize: "16px",
                        color: "black",
                        backgroundColor: "white",
                        width: "100%",
                        marginBottom: "10px",
                      }}
                    ></input>
                  </div>
                  <div className="button">
                    <button className="checkout-cta" onClick={handleOrder}>
                      Checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
