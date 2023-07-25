import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { ModalContext } from "../components/ModalContext";
import Header from "../components/Header";
import MainContents from "../components/MainContents";
import AddModal from "../components/Modals/AddModal";
import useData from "../hooks/useData";

const HomeScreen = ({ children }) => {
  const { isAddModalVisible, hideAddModal } = useContext(ModalContext);
  const { handleAddMiner } = useData(hideAddModal);

  return (
    <View style={styles.container}>
      {isAddModalVisible && (
        <AddModal
          hideAddModal={hideAddModal}
          handleAddMiner={handleAddMiner}
          minersName={"Kielo"}
        />
      )}
      <Header />
      <MainContents />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "justify-start",
  },
});

export default HomeScreen;
