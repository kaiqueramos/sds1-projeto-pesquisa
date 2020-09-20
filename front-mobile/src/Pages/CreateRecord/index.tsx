import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import Header from "../../Components/Header/Header";
import PlatformCard from "../../Components/PlatformCard/PlatformCard";
import { GamePlatform, Game } from "../../Components/PlatformCard/types";
import RNPickerSelect from "react-native-picker-select";
import { FontAwesome5 as Icon } from "@expo/vector-icons";
import Axios from "axios";
import { RectButton } from "react-native-gesture-handler";

const placeholder = {
  label: "Selecione o game",
  value: null,
};

const CreateRecord = () => {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [platform, setPlatform] = useState<GamePlatform>();
  const [selectedGame, setSelectedGame] = useState("");
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const BASE_URL = "http://192.168.0.6:8080";

  const mapSelectedGames = (games: Game[]) => {
    return games.map((game) => ({
      ...game,
      label: game.title,
      value: game.id,
    }));
  };

  const handleChangePlatform = (selectedPlatform: GamePlatform) => {
    setPlatform(selectedPlatform);
    const gamesByPlatform = allGames.filter((game) => {
      return game.platform === selectedPlatform;
    });
    setFilteredGames(gamesByPlatform);
  };

  const handleSubmit = () => {
    const payload = { name, age, gameId: selectedGame };
    Axios.post(`${BASE_URL}/records`, payload)
      .then(() => {
        Alert.alert("Dados enviados");
        setName("");
        setAge("");
        setSelectedGame("");
        setPlatform(undefined);
      })
      .catch((e) => {
        Alert.alert("Erro ao salvar suas informações. ");
      });
  };

  useEffect(() => {
    Axios.get(`${BASE_URL}/games`)
      .then((response) => {
        const selectValue = mapSelectedGames(response.data);
        setAllGames(selectValue);
      })
      .catch((e) => {
        Alert.alert("Erro ao listar os jogos. ");
      });
  }, []);

  return (
    <>
      <Header />
      <ScrollView style={styles.container}>
        <TextInput
          placeholderTextColor="#9e9e9e"
          placeholder="Nome"
          style={styles.inputText}
          onChangeText={(text) => {
            setName(text);
          }}
          value={name}
        />
        <TextInput
          keyboardType="numeric"
          placeholderTextColor="#9e9e9e"
          placeholder="Idade"
          style={styles.inputText}
          maxLength={3}
          onChangeText={(text) => {
            setAge(text);
          }}
          value={age}
        />
        <View style={styles.platformContainer}>
          <PlatformCard
            platform="PC"
            icon="laptop"
            onChange={handleChangePlatform}
            activePlatform={platform}
          ></PlatformCard>
          <PlatformCard
            platform="XBOX"
            icon="xbox"
            onChange={handleChangePlatform}
            activePlatform={platform}
          ></PlatformCard>
          <PlatformCard
            platform="PLAYSTATION"
            icon="playstation"
            onChange={handleChangePlatform}
            activePlatform={platform}
          ></PlatformCard>
        </View>
        <RNPickerSelect
          onValueChange={(value) => {
            setSelectedGame(value);
          }}
          placeholder={placeholder}
          items={filteredGames}
          value={selectedGame}
          style={pickerSelectStyles}
          Icon={() => {
            return <Icon name="chevron-down" color="#9e9e9e" size={25}></Icon>;
          }}
        />
        <View style={styles.footer}>
          <RectButton style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Salvar</Text>
          </RectButton>
        </View>
      </ScrollView>
    </>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    color: "#ED7947",
    paddingRight: 30,
    fontFamily: "Play_700Bold",
    height: 50,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    color: "#ED7947",
    paddingRight: 30,
    fontFamily: "Play_700Bold",
    height: 50,
  },
  placeholder: {
    color: "#9E9E9E",
    fontSize: 16,
    fontFamily: "Play_700Bold",
  },
  iconContainer: {
    top: 10,
    right: 12,
  },
});

const styles = StyleSheet.create({
  container: {
    marginTop: "15%",
    paddingRight: "5%",
    paddingLeft: "5%",
    paddingBottom: 50,
  },
  inputText: {
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 10,
    color: "#ED7947",
    fontFamily: "Play_700Bold",
    fontSize: 16,
    paddingLeft: 20,
    marginBottom: 21,
  },
  platformContainer: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footer: {
    marginTop: "15%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#00D4FF",
    flexDirection: "row",
    borderRadius: 10,
    height: 60,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Play_700Bold",
    fontWeight: "bold",
    fontSize: 18,
    color: "#0B1F34",
  },
});

export default CreateRecord;
