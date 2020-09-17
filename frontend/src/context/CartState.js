import React, { createContext, useState, useEffect, useReducer } from "react";
import CartReducer from "./CartReducer";
import http from "../services/httpService";
import { cartUrl } from "../config.json";

// Initial state
const initialState = {};

// Create context
export const CartContext = createContext(initialState);

// Provider component
export const CartProvider = ({ children, user }) => {
  const [cart, setCart] = useState([]);
  const [state, dispatch] = useReducer(CartReducer, { cart });

  // Actions
  const getCartItems = async () => {
    const apiEndpoint = cartUrl + `/getCartItems/${user._id}`;
    try {
      const response = await http.get(apiEndpoint);
      if (response.status == 200) {
        dispatch({
          type: "GET_CART",
          payload: response.data,
        });
      }
    } catch (e) {
      console.log("cart exception occured");
    }
  };
  function getCart() {
    getCartItems();
  }
  const deleteCartNode = async (item) => {
    const apiEndpoint = cartUrl + "/deleteCartItem";
    try {
      if (item.quantity > 1) {
        const response = await http.post(cartUrl + "/updateCartItem", {
          userId: item.userId,
          productId: item.productId,
          quantity: item.quantity - 1,
        });
      } else {
        const response = await http.delete(apiEndpoint, {
          data: {
            userId: item.userId,
            productId: item.productId,
          },
        });
      }
      dispatch({
        type: "DELETE_PRODUCT",
        payload: item,
      });
    } catch (e) {
      console.log("cart exception occured", e);
    }
  };

  function deleteItem(item) {
    deleteCartNode(item);
  }

  const addCartNode = async (item) => {
    const apiEndpoint = cartUrl + "/addCartItem";
    try {
      let response;
      if (item.quantity === 1) {
        response = await http.post(apiEndpoint, {
          userId: item.userId,
          productId: item.productId,
          productName: item.productName,
          productCost: item.productCost,
          quantity: item.quantity,
        });
      } else {
        response = await http.post(cartUrl + "/updateCartItem", {
          userId: item.userId,
          productId: item.productId,
          quantity: item.quantity + 1,
        });
      }
      if (response.data.cartId != null) {
        item.cartId = response.data.cartId;
        dispatch({
          type: "ADD_PRODUCT",
          payload: item,
        });
      }
    } catch (e) {
      console.log("cart exception occured", e);
    }
  };

  function addItem(item) {
    addCartNode(item);
  }

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        deleteItem,
        addItem,
        getCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
