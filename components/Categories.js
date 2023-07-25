import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { colors, size } from "../constants";

const Categories = ({ handleCategoryChange, categorySelected }) => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Choice
        selected={categorySelected === "All" ? true : false}
        onPress={() => handleCategoryChange("All")}
      >
        All
      </Choice>
      <Choice
        selected={categorySelected === "Pending" ? true : false}
        onPress={() => handleCategoryChange("Pending")}
      >
        Pending
      </Choice>
      <Choice
        selected={categorySelected === "Confirmed" ? true : false}
        onPress={() => handleCategoryChange("Confirmed")}
      >
        Confirmed
      </Choice>
    </View>
  );
};

const Choice = ({ children, onPress, selected }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={{
          fontSize: size.md_text,
          fontWeight: 600,
          color: selected ? colors.lightPink : colors.black,
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Categories;
