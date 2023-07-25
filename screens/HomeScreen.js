import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import { ModalContext } from "../components/ModalContext";
import Header from "../components/Header";
import MainContents from "../components/MainContents";
import AddModal from "../components/Modals/AddModal";
import useData from "../hooks/useData";
import EditModal from "../components/Modals/EditModal";

const HomeScreen = ({ children }) => {
  const {
    isAddModalVisible,
    hideAddModal,
    isEditModalVisible,
    hideEditModal,
    showEditModal,
  } = useContext(ModalContext);

  const { handleAddMiner, handleEditminer, getMinerDetails } = useData(
    hideAddModal,
    hideEditModal
  );

  const [minerToEdit, setMinertoEdit] = useState(null);

  function handleSetToEditMiner(id) {
    const miner = getMinerDetails(id);
    setMinertoEdit(miner);
    showEditModal();
  }

  return (
    <View style={styles.container}>
      {isAddModalVisible && (
        <AddModal
          hideAddModal={hideAddModal}
          handleAddMiner={handleAddMiner}
          minersName={"Kielo"}
        />
      )}
      {isEditModalVisible && (
        <EditModal
          hideEditModal={hideEditModal}
          handleEditminer={handleEditminer}
          data={minerToEdit}
        />
      )}
      <Header />
      <MainContents handleSetToEditMiner={handleSetToEditMiner} />
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
