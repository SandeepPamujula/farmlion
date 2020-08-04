import React, { useContext } from "react";
import { CartContext } from "../context/CartState";
import { getProduct } from "../services/ProductService";
import "../App.css";
export const Cart = () => {
  const { items, addItem, deleteItem } = useContext(CartContext);
  const onAdd = (item) => {
    item.quantity += 1;
    addItem(item);
  };
  const onDelete = (item) => {
    if (item.quantity > 1) {
      item.quantity -= 1;
      addItem(item);
    } else {
      deleteItem(item.id);
    }
  };

  return (
    <div className="container item-wrap" style={{ position: "relative" }}>
      {items.map((item) => (
        <div key={item.id} className=" row align-items-center border">
          <div className="col-md-2 item-img">
            <div className="row">
              <img src="download.jpg" alt="..." className="img-thumbnail"></img>
            </div>
          </div>
          <div className="col-md-4 item-info">
            <div className="brand-name">
              <a href="/">Fresho</a>
            </div>
            <div className=" product-name">
              <a href="#" className="ng-binding">
                {item.productName}
              </a>
            </div>
          </div>
          <div className="btn-counter col-md-3">
            <button
              onClick={() => onDelete(item)}
              className="btn btn-secondary btn-sm rounded-circle"
            >
              -
            </button>
            <input
              type="text"
              defaultValue={item.quantity}
              className="text-center "
              style={{ width: 40, border: "none" }}
            />
            <button
              onClick={() => onAdd(item)}
              className="btn btn-secondary btn-sm rounded-circle"
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
