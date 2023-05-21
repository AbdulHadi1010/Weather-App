import React, { useEffect, useState } from "react";
import Weathercall from "./Weathercall";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GetLocation from "react-native-get-location";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
import axios from "axios";
import Details from "./Details";
import FivedayForecast from "./FivedayForecast";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const [apiData, setApiData] = useState(null);
  const [airData, setairData] = useState(null);
  const [fiveDayData, setfiveDayData] = useState(null);
  
  const UpdateLocation = () => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then((data) => {
        Locationfetch();
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
        .then((location) => {
          callApi(location);
          callAirPollution(location);
          callFiveDay(location);
        })
        .catch((error) => {
          const { code, message } = error;
          console.warn(code, message);
        });
    };
  };
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
        //console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const callAirPollution = (location) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://api.openweathermap.org/data/2.5/air_pollution?lat=${location?.latitude}&lon=${location?.longitude}&appid=134bcc17ff7fbd17a3ec89f642825260`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setairData(response.data);
        //console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const callFiveDay = (location) => {
  
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://api.openweathermap.org/data/2.5/forecast?lat=${location?.latitude}&lon=${location?.longitude}&appid=134bcc17ff7fbd17a3ec89f642825260`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setfiveDayData(response.data)
        //console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    UpdateLocation();
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" options={{ headerShown: false }}>
        {() => <Weathercall data={apiData} />}
      </Tab.Screen>
      <Tab.Screen name="Details" options={{ headerShown: false }}>
        {() => <Details data={apiData} airpollute={airData} />}
      </Tab.Screen>
      <Tab.Screen name="5 Days" options={{ headerShown: false }}>
        {() => <FivedayForecast data = {fiveDayData}/>}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
