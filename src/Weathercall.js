import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import GetLocation from "react-native-get-location";
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

export default function Weathercall() {
  const [loc, setloc] = useState ("");
  const [apiData, setApiData] = useState();
  const [loading, setLoading] = useState(true);
  const tempchangertoC = (num) => {
    return Math.round(num-273.15)   
  }
  const UpdateLocation = () => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
    .then((data) => {    
      Locationfetch()
  })
    .catch((err) => {
      // The user has not accepted to enable the location services or something went wrong during the process
      // "err" : { "code" : "ERR00|ERR01|ERR02|ERR03", "message" : "message"}
      // codes :
      //  - ERR00 : The user has clicked on Cancel button in the popup
      //  - ERR01 : If the Settings change are unavailable
      //  - ERR02 : If the popup has failed to open
      //  - ERR03 : Internal error
    });

    const Locationfetch = () => {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
    })
    .then(location => {
        // setloc(location)
        callApi(location)
        console.log("Initial location: ", location);
        // console.log("State location: ", loc);
        
    })
    .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
    })}
  }
  const callApi = (location) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://api.openweathermap.org/data/2.5/weather?lat=${location?.latitude}&lon=${location?.longitude}&appid=134bcc17ff7fbd17a3ec89f642825260`,
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
    UpdateLocation()
    }, []);

  return (
    <View>
     {/* {console.log("State Location: ", loc)} */}
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
