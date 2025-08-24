import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";
import { AppDispatch } from "../Store";
import { closeModal, updateModalData } from "../Store/Slices/Modal/ModalSlice";
import CustomButton from "./CustomButton";
import colors from "../Config/colors";
import { updateProduct } from "../Store/Slices/Product/ProductsSlice";

const CustomModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const modal = useSelector((state: any) => state.modal);
  const [title, setTitle] = useState(modal.data?.title || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (modal.visible) {
      setTitle(modal.data?.title || "");
    }
  }, [modal.visible]);

  if (!modal.visible) return null;

  const handleSave = async () => {
    try {
      setLoading(true);
      dispatch(updateModalData(title));
      await dispatch(updateProduct({ id: modal.data.id, title }));
      dispatch(closeModal());
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Animated.View
      style={styles.overlay}
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
    >
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={() => dispatch(closeModal())}
      />
      <Animated.View
        style={styles.modal}
        entering={SlideInDown.springify().damping(15)}
        exiting={SlideOutDown.duration(250)}
      >
        <Text style={styles.title}>Edit Product Title</Text>
        <TextInput value={title} onChangeText={setTitle} style={styles.input} />
        <CustomButton
          value="Save"
          backgroundColor={colors.primary}
          onPressed={handleSave}
          loading={loading}
        />
        <CustomButton
          value="Cancel"
          backgroundColor={colors.secondary}
          onPressed={() => dispatch(closeModal())}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 15,
    minHeight: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
});
