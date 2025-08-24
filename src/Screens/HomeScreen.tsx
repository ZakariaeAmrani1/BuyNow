import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { useSelector } from "react-redux";
import colors from "../Config/colors";
import CustomList from "../Components/CustomList";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { logout } from "../Store/Slices/Auth/AuthSlice";
import Toast from "react-native-toast-message";
import { loadProducts } from "../Store/Slices/Product/ProductsSlice";
import { HomeStackParams } from "../Navigations/AppTabs";
import { AppDispatch, RootState } from "../Store";
import Screen from "../Components/Screen";

const HomeScreen = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  type HomeScreenNavigationProp = NativeStackNavigationProp<
    HomeStackParams,
    "Main"
  >;

  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    handleLoadingProducts(20, page);
  }, []);

  const handleLoadingProducts = async (limit: number = 20, skip: number) => {
    setLoading(true);
    await dispatch(loadProducts({ limit, skip }));
    setLoading(false);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(0);
    setHasMore(true);
    await handleLoadingProducts(20, page);
    setRefreshing(false);
  }, []);

  const loadMoreProducts = async () => {
    if (!loading && hasMore) {
      setPage(page + 1);
      await handleLoadingProducts(20, page);
    }
  };

  const handleProductDetails = (id: number) => {
    navigation.navigate("ProductDetails", { id });
  };

  const handleUserLogout = async () => {
    try {
      dispatch(logout());
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error while logout",
      });
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.section1}>
          <View style={styles.title}>
            <Text style={styles.text}>Welcome back</Text>
            <Text style={styles.customText}>
              {user?.lastName ?? ""} {user?.firstName ?? ""}
            </Text>
          </View>
          <View>
            <TouchableWithoutFeedback onPress={handleUserLogout}>
              <MaterialCommunityIcons name="logout" style={styles.logoutIcon} />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={styles.section2}>
          <Text style={styles.infoText}>List of available products</Text>
          <Text style={styles.moreText}>View All</Text>
        </View>
        <View style={styles.section3}>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleProductDetails(item.id)}
                activeOpacity={0.9}
              >
                <CustomList
                  name={item.title}
                  price={item.price}
                  rating={item.rating}
                />
              </TouchableOpacity>
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onEndReached={loadMoreProducts}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              loading && !refreshing ? (
                <ActivityIndicator size="large" style={{ margin: 20 }} />
              ) : null
            }
          />
        </View>
      </View>
    </Screen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  section1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    flexDirection: "row",
  },
  text: {
    color: colors.dark,
    fontWeight: "700",
    fontSize: 22,
  },
  customText: {
    marginLeft: 6,
    color: colors.primary,
    fontWeight: "700",
    fontSize: 22,
  },
  logoutIcon: {
    color: colors.dark,
    fontSize: 20,
  },
  section2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  infoText: {
    fontWeight: 600,
    color: colors.dark,
  },
  moreText: {
    fontWeight: 600,
    color: colors.primary,
  },
  section3: {
    height: "80%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
});
