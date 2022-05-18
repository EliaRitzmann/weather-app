import { StyleSheet, Image } from "react-native";
import React from "react";

const GetBackground = (props) => {
  switch (props.id) {
    case "01d":
      return (
        <Image
          style={styles.background}
          source={require("../images/svg/blurry-gradient-haikei5.png")}
        ></Image>
      );
      break;
    case "02d":
      return (
        <Image
          style={styles.background}
          source={require("../images/svg/blurry-gradient-haikei5.png")}
        ></Image>
      );
      break;
    case "03d":
      return (
        <Image
          style={styles.background}
          source={require("../images/svg/blurry-gradient-haikei10.png")}
        ></Image>
      );
      break;
    case "04d":
      return (
        <Image
          style={styles.background}
          source={require("../images/svg/blurry-gradient-haikei10.png")}
        ></Image>
      );
      break;
    case "09d":
      return (
        <Image
          style={styles.background}
          source={require("../images/svg/blurry-gradient-haikei.png")}
        ></Image>
      );
      break;
    case "10d":
      return (
        <Image
          style={styles.background}
          source={require("../images/svg/blurry-gradient-haikei.png")}
        ></Image>
      );
      break;
    case "11d" || "11n":
      return (
        <Image
          style={styles.background}
          source={require("../images/svg/blurry-gradient-haikei9.png")}
        ></Image>
      );
      break;
    case "13d" || "13n":
      return (
        <Image
          style={styles.background}
          source={require("../images/svg/blurry-gradient-haikei8.png")}
        ></Image>
      );
      break;
    case "50d" || "50n":
      return (
        <Image
          style={styles.background}
          source={require("../images/svg/blurry-gradient-haikei7.png")}
        ></Image>
      );
      break;
    case "01n" || "02n" || "03n" || "04n" || "09n" || "10n":
      return (
        <Image
          style={styles.background}
          source={require("../images/svg/blurry-gradient-haikei3.png")}
        ></Image>
      );
      break;
    default:
      return (
        <Image
          style={styles.background}
          source={require("../images/svg/blurry-gradient-haikei7.png")}
        ></Image>
      );

  }
};

export default GetBackground;

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    height: "100%",
    width: "100%",
    borderRadius: 9,
  },
});
