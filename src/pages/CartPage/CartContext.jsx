import React, { createContext, useContext, useReducer } from "react";

// 초기 상태
const initialState = {
  cartItems: [],
};

// Context 생성
const CartContext = createContext();

// Reducer 함수
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    // 다른 액션들도 필요에 따라 추가 가능
    default:
      return state;
  }
};

// Context Provider 컴포넌트
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  return (
    <CartContext.Provider value={{ state, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook: 다른 컴포넌트에서 사용하기 위한 Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
