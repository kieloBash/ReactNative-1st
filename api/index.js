import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("invoice2.db");

export async function addNewMiner(arr) {
  console.log("Added Successfully");
  let resultId = [];
  const date = new Date();
  const success = await db.transaction((tx) => {
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
        //   let existingData = [...data];
        resultId.push({
          id: resultSet.insertId,
        });
        return true;
        //   setData(existingData);
      },
      (txObj, error) => {
        console.log(error);
        return false;
      }
    );
  });

  if (success) return resultId;
}
