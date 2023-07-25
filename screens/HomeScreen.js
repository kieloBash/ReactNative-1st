import { View, StyleSheet } from "react-native";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { ModalContext } from "../components/ModalContext";
import Header from "../components/Header";
import MainContents from "../components/MainContents";
import AddModal from "../components/Modals/AddModal";
import EditModal from "../components/Modals/EditModal";
import * as SQLite from "expo-sqlite";
import { isDate7DaysOld } from "../helper";

const HomeScreen = () => {
  const {
    isAddModalVisible,
    hideAddModal,
    isEditModalVisible,
    hideEditModal,
    showEditModal,
  } = useContext(ModalContext);

  const db = SQLite.openDatabase("invoice2.db");
  const [data, setData] = useState([]);
  const [minerToEdit, setMinertoEdit] = useState(null);

  useEffect(() => {
    if (data.length === 0) {
      db.transaction((tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS invoice (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, status TEXT, cart TEXT, date TEXT, free INTEGER)"
        );
      });

      db.transaction((tx) => {
        tx.executeSql("SELECT * FROM invoice", [], (_, { rows }) => {
          const result = rows._array;
          let tempData = [];
          result.forEach((m) => {
            let cart = JSON.parse(m.cart);
            let date = JSON.parse(m.date);
            const newDate = new Date(date);
            if (!isDate7DaysOld(newDate) && m.status === "Confirmed")
              tempData.push({ ...m, ["cart"]: cart, ["date"]: date });
          });
          setData(tempData);
        });
      });
    }
  }, []);
  function getMinerDetails(id) {
    let mDetails = {};
    data?.forEach((m) => {
      if (m.id === id) {
        mDetails = m;
      }
    });
    return mDetails;
  }
  function handleAddMiner(arr) {
    console.log("Added Successfully");
    const date = new Date();
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO invoice (name,status,cart,date,free) values (?,?,?,?,?)",
        [
          arr.name,
          "Pending",
          JSON.stringify(arr.cart),
          JSON.stringify(date),
          arr.free,
        ],
        (txObj, resultSet) => {
          let existingData = [...data];
          existingData.push({
            id: resultSet.insertId,
            status: "Pending",
            name: arr.name,
            cart: arr.cart,
            date,
            free: arr.free,
          });
          setData(existingData);
          return true;
        },
        (txObj, error) => {
          console.log(error);
          return false;
        }
      );
      hideAddModal();
    });
  }
  function handleChangeStatus(id, prevStatus) {
    let status = prevStatus === "Pending" ? "Confirmed" : "Pending";
    let indexToUpdate = 0;
    data.forEach((miner, index) => {
      if (miner.id === id) {
        indexToUpdate = index;
      }
    });
    let temp = [...data];
    temp[indexToUpdate].status = status;
    setData(temp);
    db.transaction((tx) => {
      tx.executeSql("UPDATE invoice SET status = ? WHERE id = ?", [status, id]),
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            console.log("Successfully Updated");
          }
        };
    });
  }
  function handleEditminer(id, arr) {
    let indexToUpdate = 0;
    data.forEach((m, index) => {
      if (m.id === id) {
        indexToUpdate = index;
      }
    });
    let temp = [...data];
    const { name, free, cart } = arr;
    const cartString = JSON.stringify(cart);
    temp[indexToUpdate].cart = cart;
    temp[indexToUpdate].free = free;
    temp[indexToUpdate].name = name;

    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE invoice SET name = ?, free = ?, cart = ? WHERE id = ?",
        [name, free, cartString, id]
      ),
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            console.log("Successfully Updated");
          }
        };
    });
    setData(temp);
    hideEditModal();
  }
  function handleDeleteMiner(id) {
    let toDeleteIndex = 0;
    data.forEach((m, index) => {
      if (m.id === id) {
        toDeleteIndex = index;
      }
    });

    let temp = [...data];
    temp.splice(toDeleteIndex, 1);
    setData(temp);

    db.transaction((tx) => {
      tx.executeSql("DELETE FROM invoice WHERE id = ?", [id]),
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            console.log("Successfully Deleted");
          }
        },
        (txObj, error) => console.log(error);
    });
  }
  function handleSetToEditMiner(id) {
    const miner = getMinerDetails(id);
    setMinertoEdit(miner);
    showEditModal();
  }
  // CATEGORIES
  const [categorySelected, setCategorySelected] = useState("All");
  function handleCategoryChange(changeTo) {
    setCategorySelected(changeTo);
  }

  //
  const filteredData = useMemo(() => {
    if (categorySelected === "Pending") {
      return data.filter((miner) => miner.status === "Pending");
    } else if (categorySelected === "Confirmed") {
      return data.filter((miner) => miner.status === "Confirmed");
    } else {
      return data;
    }
  }, [data, categorySelected]);

  useEffect(() => {
    console.log("render");
  }, [data]);
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
      <MainContents
        handleSetToEditMiner={handleSetToEditMiner}
        data={filteredData}
        handleChangeStatus={handleChangeStatus}
        handleDeleteMiner={handleDeleteMiner}
        handleCategoryChange={handleCategoryChange}
        categorySelected={categorySelected}
      />
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
