import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useContext } from "react";
import { colors, spacing, size } from "../constants";
import Choice from "./Choice";
import MinerCard from "./MinerCard";
import useData from "../hooks/useData";
import { ModalContext } from "./ModalContext";
import AddModal from "./Modals/AddModal";

const MainContents = () => {
  const { data } = useData();
  return (
    <View style={styles.container}>
      <Categories />
      <View
        style={{
          width: "100%",
          height: 520,
          marginTop: spacing.l,
        }}
      >
        <ScrollView
          style={{
            width: "100%",
            height: "100%",
            marginTop: spacing.l,
          }}
          showsVerticalScrollIndicator={false}
          scrollEnabled={data?.length >= 5 ? true : false}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              flexDirection: "column",
              gap: spacing.l,
            }}
          >
            {data && data?.length > 0 ? (
              <MinerList data={data} />
            ) : (
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: size.sm_text,
                    color: colors.black,
                    fontWeight: 300,
                  }}
                >
                  No Miners
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: spacing.l,
    width: "100%",
    height: "100%",
  },
});

const Categories = () => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Choice>All</Choice>
      <Choice>Pending</Choice>
      <Choice>Confirmed</Choice>
    </View>
  );
};

const MinerList = ({ data }) => {
  return (
    <>
      {data?.map((miner, index) => {
        return (
          <View key={index}>
            <MinerCard
              miner={miner}
              //   showEditModal={showEditModal}
              //   handleChangeStatus={handleChangeStatus}
              //   handleSetToEditMiner={handleSetToEditMiner}
              //   handleDeleteMiner={handleDeleteMiner}
            />
          </View>
        );
      })}
    </>
  );
};

export default MainContents;
