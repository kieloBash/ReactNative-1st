import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { colors, spacing, size } from "../constants";
import Categories from "./Categories";
import MinerCard from "./MinerCard";

const MainContents = ({
  handleSetToEditMiner,
  data,
  handleChangeStatus,
  handleDeleteMiner,
  handleCategoryChange,
  categorySelected,
}) => {
  return (
    <View style={styles.container}>
      <Categories
        data={data}
        handleCategoryChange={handleCategoryChange}
        categorySelected={categorySelected}
      />
      <ScrollableContainer scrollable={data?.length >= 5 ? true : false}>
        <View
          style={{
            width: "100%",
            height: "100%",
            flexDirection: "column",
            gap: spacing.l,
          }}
        >
          {data && data?.length > 0 ? (
            <MinerList
              data={data}
              handleSetToEditMiner={handleSetToEditMiner}
              handleChangeStatus={handleChangeStatus}
              handleDeleteMiner={handleDeleteMiner}
            />
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
      </ScrollableContainer>
    </View>
  );
};

const MinerList = ({
  data,
  handleSetToEditMiner,
  handleChangeStatus,
  handleDeleteMiner,
}) => {
  return (
    <>
      {data?.map((miner, index) => {
        return (
          <View key={index}>
            <MinerCard
              miner={miner}
              handleDeleteMiner={handleDeleteMiner}
              handleChangeStatus={handleChangeStatus}
              handleSetToEditMiner={handleSetToEditMiner}
            />
          </View>
        );
      })}
    </>
  );
};

const ScrollableContainer = ({ children, scrollable }) => {
  return (
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
        scrollEnabled={scrollable}
      >
        {children}
      </ScrollView>
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

export default MainContents;
