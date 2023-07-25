import { StatusBar } from "expo-status-bar";
import { ModalProvider } from "./components/ModalContext";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  return (
    <ModalProvider>
      <StatusBar style="auto" />
      <HomeScreen />
    </ModalProvider>
  );
}
