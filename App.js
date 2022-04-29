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
    cards.push(<WeatherCard id={0} lon={location.coords.longitude} lat={location.coords.latitude}></WeatherCard>)
  }
  
  return (
    <SafeAreaView style={styles.container}>
        {cards}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
