import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { colors, size } from "../constants";

const Choice = ({ children }) => {
  return (
    <TouchableOpacity onPress={() => {}}>
      <Text
        style={{
          fontSize: size.md_text,
          fontWeight: 600,
          //   color: currentChoice === index ? colors.lightPink : colors.black,
          color: colors.lightPink,
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Choice;
