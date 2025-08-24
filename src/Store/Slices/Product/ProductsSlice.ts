import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Product } from "./Models/Product";
import axiosInstance from "../../../Services/api";

interface ProductsState {
  products: Product[];
  error: string | null;
}

const initialProductsState: ProductsState = {
  products: [],
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
      return thunkAPI.rejectWithValue(
        error.response?.data || "Email while getting products"
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
      });
  },
});

export const { setProducts } = productsSilce.actions;
export default productsSilce.reducer;
