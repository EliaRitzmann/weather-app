import React, {useEffect} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, Alert, FlatList } from 'react-native';

import * as Location from 'expo-location'
import WeatherCard from "./components/WeatherCard";

export default function App() {
  const [location, setLocation] = React.useState(null);

  const cards = []

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission Denied", "Please activate the Location in Settings")
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location)
    })();
  }, []);

  if(location){
    cards.push({id: 0, lon: location.coords.longitude, lat: location.coords.latitude, cL: true})
  }
    cards.push({id: 1, lon: 8.545094, lat: 47.373878})
    cards.push({id: 2, lon: 8.545094, lat: 47.373878})
    


    const renderItem = ({ item }) => (
      <WeatherCard lon={item.lon} lat={item.lat} cL={item.cL}></WeatherCard>
    );



  return (
    
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Weather App</Text>
        <View style={styles.header}>
          <TextInput style={styles.input} placeholder="your city"></TextInput>
          <Button title="add"></Button>
        </View>
        <FlatList style={styles.list} data={cards} renderItem={renderItem} keyExtractor={item => item.id}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    width: "100%"
  },
  title: {
    color: "white"
  },
  list: {
    width: "100%",
    flex: 1,
    alignContent: "center",
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    maxHeight: 50,
    backgroundColor: "white"
  },
  input: {

  }
});
