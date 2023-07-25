import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { colors, radius, size, spacing } from "../constants";
import Ionicons from "react-native-vector-icons/Ionicons";

const SearchBar = ({ searchMiner, setSearchMiner }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Ionicons name="ios-search" size={size.icon} color={colors.lightPink} />
      </TouchableOpacity>
      <TextInput
        value={searchMiner}
        onChangeText={setSearchMiner}
        style={styles.inputContainer}
        placeholder="Search a miner"
        placeholderTextColor={colors.lightPink}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: size.md_btn,
    backgroundColor: "white",
    borderRadius: radius.m,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.xl,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    elevation: 3,
  },
  inputContainer: {
    width: "85%",
    height: "100%",
    fontSize: size.xs,
    color: colors.lightPink,
  },
});

export default SearchBar;
