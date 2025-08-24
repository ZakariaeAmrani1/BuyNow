import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../Product/Models/Product";

interface ModalState {
  visible: boolean;
  data: Product | null;
  error: string | null;
}

const initialModalState: ModalState = {
  visible: false,
  data: null,
  error: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialModalState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalState>) => {
      state.visible = true;
      state.data = action.payload.data;
    },
    closeModal: (state) => {
      state.visible = false;
      state.data = null;
    },
    updateModalData: (state, action: PayloadAction<string>) => {
      if (state.data) {
        state.data.title = action.payload;
      }
    },
  },
});

export const { openModal, closeModal, updateModalData } = modalSlice.actions;
export default modalSlice.reducer;
