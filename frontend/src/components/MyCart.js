import React, { useState } from "react";
import Cart from "./Cart";

const MyCart = ({ user }) => {
  const [isShown, setIsShown] = useState(false);
  return (
    <div>
      <div
        className="btn btn-default bg-light d-block mb-4"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <span>My basket</span>
        {isShown && user && (
          <div className="myCart">
            <Cart />
          </div>
        )}
      </div>
    </div>
  );
};
export default MyCart;
