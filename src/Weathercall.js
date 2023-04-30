import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import axios from "axios";
import GetLocation from "react-native-get-location";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
import { BlurView } from "@react-native-community/blur";
import LinearGradient from "react-native-linear-gradient";
import Locgif from './Locgif.json';
import Loc from './loc.json';
import Lottie from "lottie-react-native";


export default function Weathercall() {
  const [apiData, setApiData] = useState();
  const [loading, setLoading] = useState(true);
  // const apiData = {
  //   coord: { lon: 74.2865, lat: 31.5081 },
  //   weather: [{ id: 721, main: "Haze", description: "haze", icon: "50n" }],
  //   base: "stations",
  //   main: {
  //     temp: 302.16,
  //     feels_like: 301.29,
  //     temp_min: 302.16,
  //     temp_max: 302.16,
  //     pressure: 1010,
  //     humidity: 34,
  //   },
  //   visibility: 5000,
  //   wind: { speed: 0, deg: 0 },
  //   clouds: { all: 20 },
  //   dt: 1682447044,
  //   sys: {
  //     type: 1,
  //     id: 7585,
  //     country: "PK",
  //     sunrise: 1682382246,
  //     sunset: 1682429844,
  //   },
  //   timezone: 18000,
  //   id: 1170157,
  //   name: "Model Town",
  //   cod: 200,
  // };

  const tempchangertoC = (num) => {
    return Math.round(num - 273.15);
  };
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
          // setloc(location)
          callApi(location);
          console.log("Initial location: ", location);
          // console.log("State location: ", loc);
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
        setLoading(false);
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    UpdateLocation()
  }, []);
  {
    /* <ActivityIndicator size="large" color="#00ff00" /> */
  }
  return (
    <View style={styles.conatiner}>
      <View style={styles.con}>
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={20}
          reducedTransparencyFallbackColor="white"
        >
          <LinearGradient
            useAngle
            angle={100}
            colors={["rgba(46,51,90,0.50)", "rgba(51,48,102,0.20)"]}
            style={styles.linearGradient}
          >

        
        {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Lottie  
          style={{width: 200, height: 200, }} 
          source={Locgif}
          autoPlay 
          loop 
          />
        </View>
      ) : (
        <>
        <Text style={styles.text1}>{apiData?.name}</Text>
            <Text style={styles.text}>
              {tempchangertoC(apiData?.main.temp)}°
            </Text>
            <Text style={styles.text_grey}>{apiData?.weather[0].main}</Text>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text style={styles.text2}>
                H:{tempchangertoC(apiData?.main.temp_max)}°
              </Text>
              <Text style={styles.text2}>
                L:{tempchangertoC(apiData?.main.temp_min)}°
              </Text>
            </View>
          
      </>
)}
        </LinearGradient>
    </BlurView>   
       </View> 
       <View style={styles.bottomView}>
        <Image
          source={require("../assets/imgs/House.png")}
        />
        <BlurView
          style={styles.blur}
          blurType="light"
          blurAmount={20}
          reducedTransparencyFallbackColor="white"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    marginTop: 100,
    flex: 1,
    alignItems: "center",
    // justifyContent: 'center',
    // width: "80%",
  },
  con: {
    width: "75%",
    // flex: 1,
  },
  linearGradient: {
    flex: 1,
    // paddingLeft: 15,
    borderRadius: 20,
  },
  bottomView: {
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  text1: {
    paddingTop: 10,
    color: "#fff",
    textAlign: "center",
    fontSize: 30,
    lineHeight: 40,
  },
  text: {
    color: "#fff",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 90,
    paddingLeft: 20,
    lineHeight: 100,
    fontWeight: 600,
  },
  text2: {
    color: "#fff",
    fontSize: 20,
    marginHorizontal: 5,
    fontWeight: 600,
  },
  text_grey: {
    color: "#EBEBF599",
    textAlign: "center",
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 25,
  },
  absolute: {
    width: "100%",
    height: 220,
    borderColor: "#fff",
    borderRadius: 200,
    borderWidth: 2,
    overlayColor: "transparent",
  },
  blur: {
    width: "100%",
    height: 60,
    overlayColor: "transparent",
  },
});
