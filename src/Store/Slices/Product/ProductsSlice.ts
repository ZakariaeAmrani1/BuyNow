import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Product } from "./Models/Product";
import axiosInstance from "../../../Services/api";
import Toast from "react-native-toast-message";

interface ProductsState {
  products: Product[];
  product: Product | null;
  error: string | null;
}

const initialProductsState: ProductsState = {
  products: [],
  product: null,
  error: null,
};

export const loadProducts = createAsyncThunk(
  "products/loadProducts",
  async (
    { limit = 20, skip = 0 }: { limit: number; skip: number },
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.get(
        `products?limit=${limit}&skip=${skip * limit}`
      );
      const data = response.data;
      const products: Product[] = [];

      data.products.map((product: any) =>
        products.push({
          id: product.id,
          title: product.title,
          description: product.description,
          category: product.category,
          price: product.price,
          rating: product.rating,
          tags: product.tags,
          brand: product.brand,
        })
      );

      return {
        skip: skip,
        products: products,
      };
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error while getting products",
      });
      return thunkAPI.rejectWithValue(
        error.response?.data || "Email while getting products"
      );
    }
  }
);

export const loadProduct = createAsyncThunk(
  "products/loadProduct",
  async ({ id }: { id: number }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`products/${id}`);
      const data = response.data;
      const product: Product = {
        id: data.id,
        title: data.title,
        description: data.description,
        category: data.category,
        price: data.price,
        rating: data.rating,
        tags: data.tags,
        brand: data.brand,
        images: data.images,
      };
      return {
        product,
      };
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error while getting product",
      });
      return thunkAPI.rejectWithValue(
        error.response?.data || "Email while getting product"
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, title }: { id: number; title: string }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`products/${id}`, {
        title,
      });
      const data = response.data;

      Toast.show({
        type: "success",
        text1: "Product updated Successfully ",
      });

      return {
        title,
      };
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error while updating product",
      });
      return thunkAPI.rejectWithValue(
        error.response?.data || "Email while updating product"
      );
    }
  }
);

const productsSilce = createSlice({
  name: "products",
  initialState: initialProductsState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductsState>) => {
      console.log(action.payload);
      state.products = action.payload.products;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        if (action.payload.skip === 0) {
          state.products = action.payload.products;
        } else {
          state.products = [...state.products, ...action.payload.products];
        }
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(loadProduct.pending, (state) => {
        state.error = null;
        state.product = null;
      })
      .addCase(loadProduct.fulfilled, (state, action) => {
        state.product = action.payload.product;
      })
      .addCase(loadProduct.rejected, (state, action) => {
        state.error = action.payload as string;
        state.product = null;
      })
      .addCase(updateProduct.pending, (state) => {
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        if (state.product) {
          state.product = {
            ...state.product,
            title: action.payload.title,
          };
          state.products = state.products.map((product) =>
            state.product && product.id === state.product.id
              ? state.product
              : product
          );
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setProducts } = productsSilce.actions;
export default productsSilce.reducer;
