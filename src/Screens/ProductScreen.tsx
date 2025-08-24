import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../Components/Screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../Config/colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParams } from "../Navigations/AppTabs";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { loadProduct } from "../Store/Slices/Product/ProductsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Store";
import { openModal } from "../Store/Slices/Modal/ModalSlice";

type ProductDetailsNavigationProp = NativeStackNavigationProp<
  HomeStackParams,
  "ProductDetails"
>;

type ProductDetailsScreenProps = RouteProp<HomeStackParams, "ProductDetails">;

type Props = {
  route: ProductDetailsScreenProps;
};

const ProductScreen = ({ route }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector((state: RootState) => state.products.product);

  const navigation = useNavigation<ProductDetailsNavigationProp>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { id } = route.params;
    handleLoadingProduct(id);
  }, []);

  const handleLoadingProduct = async (id: number) => {
    setLoading(true);
    await dispatch(loadProduct({ id }));
    setLoading(false);
  };

  const handleBackEvent = () => {
    navigation.goBack();
  };

  const handleEditEvent = () => {
    dispatch(openModal({ visible: true, data: product, error: null }));
  };
  return (
    <Screen>
      {loading ? (
        <ActivityIndicator size="large" style={{ margin: 20 }} />
      ) : (
        <View style={styles.container}>
          <View style={styles.section3}>
            <TouchableWithoutFeedback onPress={handleBackEvent}>
              <View style={styles.backButton}>
                <MaterialCommunityIcons
                  name="arrow-left"
                  style={styles.backIcon}
                />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={handleEditEvent}>
              <View style={styles.backButton}>
                <MaterialCommunityIcons name="pencil" style={styles.backIcon} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          {product?.images && (
            <View style={styles.section1}>
              <Image
                source={{ uri: product?.images[0] }}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          )}
          <View style={styles.section2}>
            <Text style={styles.title}>{product?.title}</Text>
          </View>
          <View style={styles.section3}>
            <Text style={styles.price}>{product?.price} $</Text>
            <View style={styles.ratingContainer}>
              <MaterialCommunityIcons name="star" style={styles.ratingIcon} />
              <Text style={styles.ratingText}>{product?.rating}</Text>
            </View>
          </View>
          <View style={styles.section4}>
            <Text style={styles.descriptionTitle}>Brands: </Text>
            <Text style={styles.tagTitle}>{product?.brand}</Text>
          </View>
          <View style={styles.section4}>
            <Text style={styles.descriptionTitle}>Category: </Text>
            <Text style={styles.tagTitle}>{product?.category}</Text>
          </View>
          <View style={styles.section4}>
            <Text style={styles.descriptionTitle}>Tags: </Text>
            {product?.tags.map((tag, index) => (
              <Text key={index} style={styles.tagTitle}>
                {tag}
              </Text>
            ))}
          </View>
          <View style={styles.section5}>
            <Text style={styles.descriptionTitle}>Description: </Text>
            <Text style={styles.description}>{product?.description}</Text>
          </View>
        </View>
      )}
    </Screen>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  backButton: {
    backgroundColor: colors.white,
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  backIcon: {
    color: colors.dark,
    fontSize: 20,
  },
  section1: {
    marginVertical: 20,
    alignItems: "center",
    padding: 15,
    backgroundColor: colors.white,
    borderRadius: 15,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  section2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 800,
  },
  section3: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  price: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.primary,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingIcon: {
    color: colors.yellow,
    fontSize: 20,
  },
  ratingText: {
    marginLeft: 2,
    fontSize: 14,
    fontWeight: 600,
  },
  section4: {
    flexDirection: "row",
    marginBottom: 15,
  },
  tagTitle: {
    color: colors.primary,
    textDecorationLine: "underline",
    fontWeight: 500,
    marginLeft: 5,
  },
  section5: {
    padding: 15,
    backgroundColor: colors.white,
    borderRadius: 15,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  descriptionTitle: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 5,
  },
  description: {
    textAlign: "justify",
  },
});
