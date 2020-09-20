import { StatusBar } from "expo-status-bar";
import React from "react";
import Routes from "./src/Routes";

import { StyleSheet, Text, View, ScrollView } from "react-native";
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
      <Routes></Routes>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
