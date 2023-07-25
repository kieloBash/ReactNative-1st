import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { radius, size, spacing, colors } from "../constants";
import SearchBar from "./SearchBar";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ModalContext } from "./ModalContext";

const Header = ({ searchInput, handleOnChangeSearch }) => {
  const { showAddModal } = useContext(ModalContext);

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Text>Hello</Text>
        <Text>World</Text>
      </View> */}
      <View style={styles.inputsContainer}>
        <SearchBar
          searchInput={searchInput}
          handleOnChangeSearch={handleOnChangeSearch}
        />
        <TouchableOpacity style={styles.headerBtn} onPress={showAddModal}>
          <Ionicons
            name="person-add"
            size={size.icon}
            color={colors.lightPink}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "20%",
    backgroundColor: "rgba(255,149,130,1)",
    padding: spacing.l,
  },
  header: {
    position: "relative",
    paddingBottom: 40,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: "100%",
  },
  inputsContainer: {
    width: "100%",
    height: "50%",
    position: "absolute",
    bottom: -30,
    left: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.l,
  },
  headerBtn: {
    width: size.md_btn,
    height: size.md_btn,
    backgroundColor: "white",
    borderRadius: radius.m,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
});

export default Header;
