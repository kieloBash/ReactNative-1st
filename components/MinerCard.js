import React, { useEffect, useMemo, useState } from "react";
import { colors, formatDate, radius, size, spacing } from "../constants";
import Fa from "react-native-vector-icons/FontAwesome";
import MIcons from "react-native-vector-icons/MaterialIcons";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const MinerCard = ({
  miner,
  showEditModal,
  handleChangeStatus,
  handleSetToEditMiner,
  handleDeleteMiner,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const total = useMemo(() => countTotal(), [miner.cart]);

  function countTotal() {
    let totalPrice = 0;
    miner.cart.forEach((item) => {
      totalPrice += Number(item);
    });
    return totalPrice;
  }

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "white",
        borderRadius: radius.l,
        padding: spacing.l,
        flexDirection: "row",
        justifyContent: "space-between",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      {/* <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        style={{ flex: 1, position: "relative" }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            paddingTop: 60,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: radius.l,
              padding: spacing.l,
            }}
          >
            <Text>Copied Successfully!</Text>
          </View>
        </View>
      </Modal> */}

      <MinerDetails {...miner} total={total} />

      <View
        style={{
          flexDirection: "column",
          width: "30%",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: spacing.m,
        }}
      >
        <TouchableOpacity
          // onPress={() => {
          //   handleChangeStatus(miner.id, miner.status);
          // }}
          style={{
            backgroundColor:
              miner.status === "Pending" ? colors.pending : colors.confirmed,
            paddingHorizontal: spacing.m,
            paddingVertical: 2,
            fontSize: size.sm_text,
            borderRadius: radius.s,
          }}
        >
          <Text
            style={{
              color:
                miner.status === "Pending"
                  ? colors.pendingText
                  : colors.confirmedText,
            }}
          >
            {miner.status}
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", gap: spacing.m }}>
          <TouchableOpacity
          // onPress={() => handleSetToEditMiner(miner.id)}
          >
            <Fa name="edit" size={size.sm_icon} color={colors.black} />
          </TouchableOpacity>
          <TouchableOpacity
          // onPress={() => {
          //   handleDeleteMiner(miner.id);
          // }}
          >
            <MIcons name="delete" size={size.sm_icon} color={colors.black} />
          </TouchableOpacity>
          <TouchableOpacity
          // onPress={handleCopy}
          >
            <MIcons
              name="content-copy"
              size={size.sm_icon}
              color={colors.black}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const MinerDetails = ({ name, free, cart, total }) => {
  return (
    <View style={{ flexDirection: "column", width: "65%" }}>
      <Text
        style={{
          fontSize: size.md_text,
          fontWeight: 700,
          color: colors.black,
        }}
      >
        {name}
      </Text>

      <Text
        style={{
          fontSize: size.xs_text,
          fontWeight: 400,
          color: colors.lightBlack,
        }}
      >
        ₱{total?.toLocaleString()} - {free} free - {cart.length} items
      </Text>
    </View>
  );
};
export default MinerCard;
