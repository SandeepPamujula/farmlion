import React, { useContext } from "react";
import { CartContext } from "../context/CartState";
import _ from "lodash";
import "../App.css";

function RenderAddButton({ product, userId }) {
  const { cart, addItem, deleteItem } = useContext(CartContext);
  const onAdd = (product) => {
    const item = {
      userId: userId,
      productId: product._id,
      productName: product.productName,
      price: product.price,
      quantity: 1,
    };
    addItem(item);
  };
  const onIncrement = (item) => {
    addItem(item);
  };
  const onDecrement = (item) => {
    deleteItem(item);
  };
  const returnItem = (productId) => {
    return _.find(cart, ["productId", productId]);
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
export const ProductList = ({ products, user }) => {
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
            <RenderAddButton product={product} userId={user._id} />
          </div>
        </div>
      ))}
    </div>
  );
};
export default ProductList;
