import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/Auth/AuthSlice";
import productsReducer from "./Slices/Product/ProductsSlice";
import modalReducer from "./Slices/Modal/ModalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
