import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, radius, size, spacing } from "../../constants";
import DropDownPicker from "react-native-dropdown-picker";

const AddModal = ({ hideAddModal, handleAddMiner, minersName }) => {
  const [currentName, setCurrentName] = useState(undefined);
  const [currentPrice, setCurrentPrice] = useState(undefined);
  const [currentCart, setCurrentCart] = useState([]);
  const [currentFree, setCurrentFree] = useState(0);

  const [activeName, setActiveName] = useState(0);

  // DROPDOWN
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(minersName);

  function handleAddToCart() {
    setCurrentCart([...currentCart, currentPrice]);
    setCurrentPrice(undefined);
  }
  function handleSubmit() {
    if (activeName === 0) {
      if (currentName != undefined && currentCart.length > 0) {
        const toAdd = {
          name: currentName,
          cart: currentCart,
          free: currentFree,
        };
        handleAddMiner(toAdd);
      }
    } else {
      if (value != undefined && currentCart.length > 0 && value != null) {
        const toAdd = {
          name: value,
          cart: currentCart,
          free: currentFree,
        };
        handleAddMiner(toAdd);
      }
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: spacing.s,
          }}
        >
          {activeName === 1 && (
            <TouchableOpacity
              onPress={() => {
                setActiveName(0);
              }}
            >
              <Text
                style={{ textDecorationLine: "underline", color: colors.black }}
              >
                New
              </Text>
            </TouchableOpacity>
          )}
          <Text
            style={{
              fontSize: size.md_text,
              fontWeight: 700,
              color: colors.lightPink,
              marginBottom: 4,
              textAlign: "center",
            }}
          >
            {activeName === 0 ? "New Miner" : "Existing Miner"}
          </Text>
          {activeName === 0 && (
            <TouchableOpacity
              onPress={() => {
                setActiveName(1);
              }}
            >
              <Text
                style={{ textDecorationLine: "underline", color: colors.black }}
              >
                Existing
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "red",
          }}
        >
          <Text
            style={{
              color: colors.lightPink,
              fontSize: size.sm_text,
              width: "20%",
              textAlign: "right",
              marginRight: 6,
            }}
          >
            Miner:
          </Text>
          {activeName === 0 ? (
            <TextInput
              value={currentName}
              onChangeText={setCurrentName}
              placeholder="Enter miner name"
              style={{
                borderBottomColor: colors.lightPink,
                borderBottomWidth: 1,
                color: colors.black,
                fontSize: size.sm_text,
                width: "75%",
              }}
            />
          ) : (
            <View style={{ width: "75%" }}>
              <DropDownPicker
                dropDownDirection="TOP"
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="Select a Miner"
                containerStyle={{
                  backgroundColor: "transparent",
                  borderWidth: 0,
                  color: colors.black,
                  fontSize: size.sm_text,
                  width: "100%",
                  borderColor: colors.lightPink,
                }}
                style={{
                  backgroundColor: "transparent",
                  borderWidth: 0,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.lightPink,
                  color: colors.black,
                  fontSize: size.sm_text,
                  width: "100%",
                }}
                dropDownContainerStyle={{
                  backgroundColor: "white",
                  borderWidth: 0,
                  color: colors.black,
                  fontSize: size.sm_text,
                  width: "100%",
                }}
              />
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.lightPink,
              fontSize: size.sm_text,
              width: "20%",
              textAlign: "right",
              marginRight: 6,
            }}
          >
            Price:
          </Text>
          <TextInput
            value={currentPrice}
            onChangeText={setCurrentPrice}
            placeholder="Enter item price"
            style={{
              borderBottomColor: colors.lightPink,
              borderBottomWidth: 1,
              color: colors.black,
              fontSize: size.sm_text,
              width: "68%",
            }}
          />
          <TouchableOpacity
            onPress={handleAddToCart}
            style={{
              width: size.sm_icon,
              height: size.sm_icon,
              backgroundColor: colors.lightPink,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 100,
            }}
          >
            <Text style={{ color: "white" }}>+</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginTop: 8,
          }}
        >
          <View style={{ flexDirection: "row", gap: 2 }}>
            <Text
              style={{
                fontSize: size.sm_text,
                fontWeight: 300,
                color: colors.black,
              }}
            >
              Cart
            </Text>
            <Text
              style={{
                fontWeight: 600,
                color: currentCart.length > 0 ? colors.lightPink : colors.black,
              }}
            >
              {currentCart.length}
            </Text>
          </View>

          <View
            style={{
              width: "50%",
              backgroundColor: colors.lightPink,
              height: 40,
              borderRadius: radius.s,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (currentFree > 0) setCurrentFree((prev) => prev - 1);
              }}
              style={{
                width: "25%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: size.md_text }}>-</Text>
            </TouchableOpacity>
            <View
              style={{
                width: "50%",
                borderLeftWidth: 1,
                borderLeftColor: "white",
                borderRightWidth: 1,
                borderRightColor: "white",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: 700,
                  fontSize: size.sm_text,
                }}
              >
                {currentFree} Free
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setCurrentFree((prev) => prev + 1);
              }}
              style={{
                width: "25%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: size.md_text }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          {currentCart.length > 0 ? (
            <View
              style={{
                width: "100%",
                paddingVertical: spacing.m,
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: spacing.s,
                flexDirection: "row",
              }}
            >
              {currentCart.map((item, index) => {
                return (
                  <View key={index}>
                    <TouchableOpacity
                      onPress={() => {
                        if (currentCart.length != 1) {
                          const filteredCart = [...currentCart];
                          filteredCart.splice(index, 1);
                          setCurrentCart(filteredCart);
                        }
                      }}
                      style={{
                        backgroundColor: colors.lightPink,
                        paddingHorizontal: spacing.m,
                        borderRadius: radius.s,
                        paddingVertical: 2,
                      }}
                    >
                      <Text>₱{Number(item).toLocaleString()}</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          ) : (
            <View
              style={{
                width: "100%",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>No Items</Text>
            </View>
          )}
        </View>

        <View
          style={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={hideAddModal}
            style={{
              backgroundColor: colors.lightPink,
              width: "48%",
              height: size.sm_btn,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: radius.s,
            }}
          >
            <Text
              style={{
                fontSize: size.sm_text,
                fontWeight: 600,
                color: "white",
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              borderWidth: 2,
              borderColor: colors.lightPink,
              width: "48%",
              height: size.sm_btn,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: radius.s,
            }}
          >
            <Text
              style={{
                fontSize: size.sm_text,
                fontWeight: 600,
                color: colors.lightPink,
              }}
            >
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.l,
  },
  innerContainer: {
    backgroundColor: "white",
    paddingHorizontal: spacing.xl,
    paddingVertical: 20,
    width: "100%",
    borderRadius: radius.l,
    flexDirection: "column",
    gap: spacing.l,
  },
});

export default AddModal;
