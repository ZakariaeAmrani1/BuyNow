import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../Config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface CustomListProps {
  name: string;
  price: number;
  rating: number;
}

const CustomList: React.FC<CustomListProps> = ({ name, price, rating }) => {
  return (
    <View style={styles.container}>
      <View style={styles.seperator}>
        <MaterialCommunityIcons style={styles.icon} name="shopping" />
        <View style={styles.detailSection}>
          <Text style={styles.name}>{name.substring(0, 20) + "..."}</Text>
          <Text style={styles.price}>{price} $</Text>
        </View>
      </View>
      <View style={styles.ratingSection}>
        <MaterialCommunityIcons name="star" style={styles.ratingIcon} />
        <Text style={styles.ratingText}>{rating}</Text>
      </View>
    </View>
  );
};

export default CustomList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: "98%",
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    elevation: 5,
    marginVertical: 5,
  },
  seperator: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    color: colors.primary,
    fontSize: 25,
  },
  detailSection: {
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.dark,
  },
  price: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.primary,
  },
  ratingSection: {
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
});
