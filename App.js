import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import { colors } from "./constants";
import MainContents from "./components/MainContents";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header />
      <MainContents />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "justify-start",
  },
  background: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.bg,
    position: "relative",
  },
});
