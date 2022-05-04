import { View, Text } from "react-native";
import React from "react";
import ClearSky from "../images/svg/wi-day-sunny.svg";
import Cloud from "../images/svg/wi-cloud-up.svg";
import Cloudy from "../images/svg/wi-cloudy.svg";
import Rain from "../images/svg/wi-rain.svg";
import Showers from "../images/svg/wi-showers.svg";
import Snow from "../images/svg/wi-snow.svg";
import Fog from "../images/svg/wi-fog.svg";
import Thunderstorm from "../images/svg/wi-thunderstorm.svg";
import FewClouds from "../images/svg/wi-day-cloudy.svg";

const GetIcon = (props) => {
    console.log(props.id)
  switch (props.id) {
    case "01d":
      return <ClearSky width={100} height={100} fill={"white"}></ClearSky>;
      break;
    case "02d":
      return <FewClouds width={100} height={100} fill={"white"}></FewClouds>;
      break;
    case "03d":
      return <Cloud width={100} height={100} fill={"white"}></Cloud>;
      break;
    case "04d":
      return <Cloudy width={100} height={100} fill={"white"}></Cloudy>;
      break;
    case "09d":
      return <Showers width={100} height={100} fill={"white"}></Showers>;
      break;
    case "10d":
      return <Rain width={100} height={100} fill={"white"}></Rain>;
      break;
    case "11d":
      return (
        <Thunderstorm width={100} height={100} fill={"white"}></Thunderstorm>
      );
      break;
    case "13d":
      return <Snow width={100} height={100} fill={"white"}></Snow>;
      break;
    case "50d":
      return <Fog width={100} height={100} fill={"white"}></Fog>;
      break;
  }
};

export default GetIcon;
