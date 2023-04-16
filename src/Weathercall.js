import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";

export default function Weathercall() {
  // const [apiData, setApiData] = useState();
  const [loading, setLoading] = useState(true);
  // const [tempinC, settempinC] = useState(true);
  const tempchangertoC = (num) => {
    return Math.round(num-273.15)   
  }
  const apiData = {
    coord: {lon: 74.32,lat: 31.58,},
    weather: [{id: 721,main: "Haze",description: "haze",icon: "50n",},],
    base: "stations",
    main: {temp: 301.08,feels_like: 300.51,temp_min: 299.15,temp_max: 301.08,pressure: 1007,humidity: 36,},
    visibility: 5000,
    wind: {speed: 3.09,deg: 90,},
    clouds: {all: 100,},
    dt: 1681585723,
    sys: {type: 1,id: 7585,country: "PK",sunrise: 1681605223,sunset: 1681651870,},
    timezone: 18000,
    id: 1172451,
    name: "Lahore",
    cod: 200,
  };
  // const callApi = () => {
  // let config = {
  //   method: "get",
  //   maxBodyLength: Infinity,
  //   url: "https://api.openweathermap.org/data/2.5/weather?lat=31.58&lon=74.32&appid=134bcc17ff7fbd17a3ec89f642825260",
  //   headers: {},
  // };

  // axios
  //   .request(config)
  //   .then((response) => {
  //     setApiData(response.data);
  //     setLoading(false);
  //     console.log(JSON.stringify(response.data));
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // }
  // useEffect(() => {
  //   callApi();
  // }, []);
 
  return (
    <View>
      {/* {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : ( */}
        <>
          <Text style={{ marginTop: 10, fontSize: 15, textAlign: "center" }}>
            City: {apiData.name}
          </Text>
          <Text style={{ marginTop: 10, fontSize: 15, textAlign: "center" }}>Temparature: {tempchangertoC(apiData?.main.temp)}° C</Text>
          <Text style={{ marginTop: 10, fontSize: 15, textAlign: "center" }}>Feels Like: {tempchangertoC(apiData?.main.feels_like)}° C</Text>
          <Text style={{ marginTop: 10, fontSize: 15, textAlign: "center" }}>Max temparature: {tempchangertoC(apiData?.main.temp_max)}° C</Text>
          <Text style={{ marginTop: 10, fontSize: 15, textAlign: "center" }}>Min temparature: {tempchangertoC(apiData?.main.temp_min)}° C</Text>

        </>
        
      {/* )} */}
    </View>
  );
}
