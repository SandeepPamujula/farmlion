import React, { useContext } from "react";
import { CartContext } from "../context/CartState";
import _ from "lodash";
import "../App.css";

function RenderAddButton({ product }) {
  const { items, addItem, deleteItem } = useContext(CartContext);
  const onAdd = (product) => {
    const currentItem = items.filter((item) => item.id === product._id);
    console.log(currentItem);
    if (currentItem[0]) {
      currentItem[0].quantity += 1;
      addItem(currentItem[0]);
    } else {
      const item = {
        id: product._id,
        productName: product.productName,
        price: product.price,
        quantity: 1,
      };
      addItem(item);
    }
  };
  const onIncrement = (item) => {
    item.quantity += 1;
    addItem(item);
  };
  const onDecrement = (item) => {
    if (item.quantity > 1) {
      item.quantity -= 1;
      addItem(item);
    } else {
      deleteItem(item.id);
    }
  };
  const returnItem = (id) => {
    console.log(_.find(items, ["id", id]));
    return _.find(items, ["id", id]);
  };
  if (returnItem(product._id)) {
    return (
      <div className=" d-flex">
        <button
          className="btn border "
          onClick={() => onDecrement(returnItem(product._id))}
        >
          -
        </button>
        <input
          type="text"
          value={returnItem(product._id).quantity + " in cart "}
          className="text-center bg-warning w-50"
          disabled
        />
        <button
          className="btn border"
          onClick={() => onIncrement(returnItem(product._id))}
        >
          +
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <button
          onClick={() => onAdd(product)}
          className="btn btn-warning btn-sm"
        >
          Add Cart
        </button>
      </div>
    );
  }
}
export const ProductList = ({ products }) => {
  return (
    <div className="product-container">
      {products.map((product) => (
        <div key={product._id} className="product">
          <div className="product-header">
            <img src="download.jpg" alt="..." className="img-thumbnail"></img>
          </div>
          <div className="product-body">
            <label>Fresho</label>
            <h6>{product.productName}</h6>
            <label>500g</label>
            <div>MRP: Rs{product.price}/kg</div>
            <span className="">FarmerName: {product.farmerName}</span>
            <span className="">FarmingType: {product.farmingType}</span>
            <RenderAddButton product={product} />
          </div>
        </div>
      ))}
    </div>
  );
};
export default ProductList;
