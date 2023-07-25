import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Header = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "20%",
    backgroundColor: "rgba(255,149,130,1)",
  },
});

export default Header;
