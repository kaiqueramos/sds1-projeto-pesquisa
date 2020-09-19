import { StatusBar } from "expo-status-bar";
import React from "react";
import Header from "./src/Components/Header/Header";
import Home from "./src/Pages/Home";

import { StyleSheet, Text, View } from "react-native";
import { AppLoading } from "expo";
import {
  useFonts,
  Play_400Regular,
  Play_700Bold,
} from "@expo-google-fonts/play";

export default function App() {
  const [FontsLoaded] = useFonts({
    Play_400Regular,
    Play_700Bold,
  });
  if (!FontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <Header></Header>
      <Home></Home>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1F34",
  },
});
