import React, { createContext, useReducer } from "react";
import CartReducer from "./CartReducer";

// Initial state
const initialState = {
  items: [],
};

// Create context
export const CartContext = createContext(initialState);

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  // Actions
  function deleteItem(id) {
    dispatch({
      type: "DELETE_ITEM",
      payload: id,
    });
  }

  function addItem(item) {
    dispatch({
      type: "ADD_ITEM",
      payload: item,
    });
  }

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        deleteItem,
        addItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
