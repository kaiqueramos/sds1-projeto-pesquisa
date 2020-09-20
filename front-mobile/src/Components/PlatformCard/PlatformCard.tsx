import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { onChange } from "react-native-reanimated";
import { GamePlatform } from "./types";
import { FontAwesome5 as Icon } from "@expo/vector-icons";

type Props = {
  platform: GamePlatform;
  onChange: (platform: GamePlatform) => void;
  icon: string;
  activePlatform?: GamePlatform;
};

const PlatformCard = ({ platform, onChange, icon, activePlatform }: Props) => {
  const isActive = platform === activePlatform;
  const backgroundColor = isActive ? "#FAD7C8" : "#FFF";
  const textColor = isActive ? "#ED7947" : "#9E9E9E";

  return (
    <RectButton
      onPress={() => onChange(platform)}
      style={[styles.platformCard, { backgroundColor }]}
    >
      <Icon name={icon} size={60} color={textColor}></Icon>
      <Text style={[styles.platformCardText, { color: textColor }]}>
        {platform === "PLAYSTATION" ? "PS" : platform}
      </Text>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  platformCard: {
    paddingTop: 30,
    paddingBottom: 20,
    width: "30%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  platformCardText: {
    marginTop: 40,
    color: "#9E9E9E",
    fontSize: 24,
    fontFamily: "Play_700Bold",
    textAlign: "center",
  },
});

export default PlatformCard;
