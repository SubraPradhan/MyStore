import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice";

const loadCart = () => {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer
  },
  preloadedState: {
    cart: loadCart()
  }
});

store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cart));
});