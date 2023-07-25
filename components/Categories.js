import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { colors, size } from "../constants";

const Categories = ({ handleCategoryChange, categorySelected, data }) => {
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
        data={data}
      >
        All
      </Choice>
      <Choice
        selected={categorySelected === "Pending" ? true : false}
        onPress={() => handleCategoryChange("Pending")}
        data={data}
      >
        Pending
      </Choice>
      <Choice
        selected={categorySelected === "Confirmed" ? true : false}
        onPress={() => handleCategoryChange("Confirmed")}
        data={data}
      >
        Confirmed
      </Choice>
    </View>
  );
};

const Choice = ({ children, onPress, selected, data }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ position: "relative" }}>
      {selected ? (
        <View
          style={{
            position: "absolute",
            top: -5,
            right: -8,
            zIndex: 1,
            backgroundColor: colors.lightPink,
            width: 20,
            height: 20,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Text>{data?.length}</Text>
        </View>
      ) : null}
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
