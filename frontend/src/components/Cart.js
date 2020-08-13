import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/CartState";
import { getProduct } from "../services/ProductService";
import "../App.css";
export const Cart = () => {
  const { cart, addItem, deleteItem, getCart } = useContext(CartContext);
  useEffect(() => {
    if (cart[0] == null) {
      getCart();
    }
  });
  const onAdd = (item) => {
    addItem(item);
  };
  const onDelete = (item) => {
    deleteItem(item);
  };
  const handleChange = ({ currentTarget: input }) => {};

  return (
    <div className="container item-wrap" style={{ position: "relative" }}>
      {cart.map((item) => (
        <div key={item.productId} className=" row align-items-center border">
          <div className="col-md-2 item-img">
            <div className="row">
              <img src="download.jpg" alt="..." className="img-thumbnail"></img>
            </div>
          </div>
          <div className="col-md-4 ">
            <div className="brand-name">
              <a href="/">Fresho</a>
            </div>
            <div className=" product-name">
              <a href="/" className="">
                {item.productName}
              </a>
            </div>
          </div>
          <div className="col-md-3">
            <button
              className="btn btn-secondary btn-sm rounded-circle"
              onClick={() => onDelete(item)}
            >
              -
            </button>
            <input
              type="text"
              value={item.quantity}
              className="text-center "
              onChange={handleChange}
              style={{ width: 40, border: "none" }}
            />
            <button
              className="btn btn-secondary btn-sm rounded-circle"
              onClick={() => onAdd(item)}
            >
              +
            </button>
          </div>

          <div className=" col-md-3 product-qty ng-binding">
            MRP:{item.price}/kg
          </div>
        </div>
      ))}
    </div>
  );
};
export default Cart;
