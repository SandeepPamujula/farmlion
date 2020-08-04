import React, { useState } from "react";
import Cart from "./Cart";

const MyCart = () => {
  const [isShown, setIsShown] = useState(false);
  return (
    <div>
      <button
        className="btn btn-default d-block mb-4"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <span>My basket</span>
        {isShown && (
          <div className="myCart">
            <Cart />
          </div>
        )}
      </button>
    </div>
  );
};
export default MyCart;
