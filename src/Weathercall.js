import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import GetLocation from "react-native-get-location";

export default function Weathercall() {
  const [loc, setloc] = useState ("");
  const [apiData, setApiData] = useState();
  const [loading, setLoading] = useState(true);
  const tempchangertoC = (num) => {
    return Math.round(num-273.15)   
  }
  const Locationfetch = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
  })
  .then(location => {
      setloc(location)
      console.log("Initial location: ", loc);
      
  })
  .catch(error => {
      const { code, message } = error;
      console.warn(code, message);
  })}
  const callApi = () => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://api.openweathermap.org/data/2.5/weather?lat=${loc?.latitude}&lon=${loc?.longitude}&appid=134bcc17ff7fbd17a3ec89f642825260`,
    headers: {},
  };
  axios
    .request(config)
    .then((response) => {
      setApiData(response.data);
      setLoading(false);
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  }
  useEffect(() => {
    Locationfetch()
    callApi()
    }, []);

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <>
          <Text style={{ marginTop: 10, fontSize: 15, textAlign: "center" }}>
            City: {apiData.name}
          </Text>
          <Text style={{ marginTop: 10, fontSize: 15, textAlign: "center" }}>Temparature: {tempchangertoC(apiData?.main.temp)}° C</Text>
          <Text style={{ marginTop: 10, fontSize: 15, textAlign: "center" }}>Feels Like: {tempchangertoC(apiData?.main.feels_like)}° C</Text>
          <Text style={{ marginTop: 10, fontSize: 15, textAlign: "center" }}>Max temparature: {tempchangertoC(apiData?.main.temp_max)}° C</Text>
          <Text style={{ marginTop: 10, fontSize: 15, textAlign: "center" }}>Min temparature: {tempchangertoC(apiData?.main.temp_min)}° C</Text>
        </>
        
      )}
    </View>
  );
}
