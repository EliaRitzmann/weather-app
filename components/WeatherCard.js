import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState, useEffect } from "react";
import GetIcon from "./GetIcon";
import GetBackground from "./GetBackground";
import { getApiKey } from "../api/apikey";

export default function WeatherCard(props) {
  const API_KEY = getApiKey();
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(getDataByCords(props.lon, props.lat));
  }, []);

  function getDataByCords(lon, lat) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        API_KEY +
        "&units=metric" +
        "&lang=de"
    )
      .then((response) => response.json())
      .then((info) => setData(info))
      .catch((error) => setData(error));
  }

  function getCounty(){
    if(props.cL){
        return "current Location"
    }
    else{
      return data?.sys.country
    }
  }
  console.log(data)
  if (data?.name) {
    return (
      <View style={styles.card}>
        <View style={styles.container}>
          <GetBackground id={data?.weather[0].icon}></GetBackground>
          <View style={styles.header}>
            <Text style={styles.headerText}>{data?.name} | {getCounty()}</Text>
          </View>
          <View style={styles.content}>
            <View style={styles.leftContainer}>
              <GetIcon id={data?.weather[0].icon}></GetIcon>
              <Text style={styles.leftContainerText} numberOfLines={1}>{data?.weather[0].description}</Text>
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.temperature}>{data?.main.temp + "°"}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.card}>
        <View style={styles.container}>
        <Text style={styles.headerText}>loading...</Text>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 20,
  },
  container: {
    width: "100%",
    height: 125,
    backgroundColor: "#5772FF",
    borderRadius: 9,
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 12,
    marginTop: 20,
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    maxHeight: 25
  },
  headerText:{
    color: "white",
    fontWeight: "500",
  },
  content: {
    flex: 1,
    flexDirection: "row",
  },
  leftContainer: {
    flex: 1,
    marginTop: -20
  },
  leftContainerText: {
    marginTop: -10,
    marginLeft: 18,
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row-reverse",
    margin: 20,
  },
  temperature: {
    color: "white",
    fontSize: 40,
    fontWeight: "700"
  },
});
