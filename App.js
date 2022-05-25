import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  Alert,
  FlatList,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import * as Location from "expo-location";
import WeatherCard from "./components/WeatherCard";
import { getApiKey } from "./api/apikey";

export default function App() {
  const API_KEY = getApiKey();
  const [location, setLocation] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [textField, setTextField] = React.useState("");

  const cards = [];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Please activate the Location in Settings"
        );
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    getData()
  }, []);

  async function getData() {
    let result = await AsyncStorage.getItem("data");
    if (result !== null) {
      console.log("🔐 Here's your value 🔐 \n" + result);
      console.log(result);
      setData(JSON.parse(result));
    } else {
      console.log("No values stored under that key.");
    }
  }

  

  async function addCity() {
    let place = null
    await fetch(
      "http://api.openweathermap.org/geo/1.0/direct?q=" + textField + "&limit=10&appid=" + API_KEY
    )
      .then((response) => response.json())
      .then((info) => place = {lat: info[0].lat, lon: info[0].lon})
      .catch((error) => Alert.alert('Fehler', "Die eingegebene Stadt gibt es nicht!", [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]));

    if(place){
      try {
        console.log("hallo" + place)
        await AsyncStorage.setItem("data", JSON.stringify([...data, place]));
        setData((oldArray) => [...oldArray, place]);
      } catch (e) {
        // saving error
        console.log("ich hasse das alles");
      }
    }
    setTextField("")
  }

  async function clearList(){
      await AsyncStorage.clear();
      setData("")
  }

  if (location) {
    cards.push({
      id: 0,
      lon: location.coords.longitude,
      lat: location.coords.latitude,
      cL: true,
    });
  }

  for (var i = 0; i < data.length; i++) {
    cards.push({ id: i + 1, lon: data[i].lon, lat: data[i].lat });
  }

  const renderItem = ({ item }) => (
    <WeatherCard lon={item.lon} lat={item.lat} cL={item.cL}></WeatherCard>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark"></StatusBar>
      <Text style={styles.title}>Weather App</Text>
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          placeholder="your city"
          value={textField}
          onChangeText={setTextField}
          placeholderTextColor="gray"
          onEndEditing={addCity}
        ></TextInput>
        <Button title="add" onPress={addCity}></Button>
        <Button title="clear" onPress={clearList}></Button>
      </View>
      <FlatList
        style={styles.list}
        data={cards}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    marginTop: 50,
  },
  title: {
    color: "white",
  },
  list: {
    width: "100%",
    flex: 1,
    alignContent: "center",
    marginBottom: 80,
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    maxHeight: 50,
    backgroundColor: "white",
    marginTop: -20,
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    width: "50%",
  },
});
