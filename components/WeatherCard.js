import { View, Text } from 'react-native'
import React, {useState, useEffect} from 'react'

export default function WeatherCard(props) {
    const API_KEY = "ca526e5c9969d73403afa49016f1f9b6"
    const [data , setData] = useState(null)

    useEffect(() => {
        setData(getDataByCords(props.lon, props.lat))
    }, [])
    

    function getDataByCords(lon, lat){
        fetch("https://api.openweathermap.org/data/2.5/weather?lat="+ lat + "&lon="+ lon +"&appid="+ API_KEY)
        .then(response => response.json())
        .then(info => setData(info))
        .catch(error => setData(error))
      }
      console.log(data)

      if(data){
        return (
            <View>
              <Text>{data?.name}</Text>
            </View>
          )
      }else{
        return (
            <View>
              <Text>loading...</Text>
            </View>
          )
      }
}