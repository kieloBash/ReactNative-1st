import React, { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";

const useData = (hideAddModal) => {
  const [data, setData] = useState([]);

  const db = SQLite.openDatabase("invoice2.db");

  useEffect(() => {
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
          tempData.push({ ...m, ["cart"]: cart, ["date"]: date });
        });
        setData(tempData);
        // setAllData(tempData);
        // setCurrentMiners(tempData);
        // getMinersName(tempData);

        // COUNT
        let tempPending = 0;
        let tempConfirmed = 0;
        tempData.forEach((miner) => {
          if (miner.status === "Pending") {
            miner.cart.forEach((item) => {
              tempPending += Number(item);
            });
          } else {
            miner.cart.forEach((item) => {
              tempConfirmed += Number(item);
            });
          }
        });
        // setPendingTotal(tempPending);
        // setConfirmedTotal(tempConfirmed);

        // DATE
        // if (tempData.length > 0)
        //   getDateToday(tempData[tempData.length - 1].date);
        // else {
        //   getDateToday(new Date());
        // }
      });
    });
  }, [data]);

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
  return { data, handleAddMiner, handleDeleteMiner };
};

export default useData;
