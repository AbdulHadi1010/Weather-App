import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";

import { BlurView } from "@react-native-community/blur";
import LinearGradient from "react-native-linear-gradient";
import Locgif from "./Locgif.json";
import Lottie from "lottie-react-native";

export default function Weathercall({ data }) {
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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (data) {
        setLoading(false);
      } // Set loading to false after a delay
    }, 2000);
  }, [data]);

  const tempchangertoC = (num) => {
    return Math.round(num - 273.15);
  };
  return (
    <View style={styles.conatiner}>
      <ImageBackground
        source={require("../assets/imgs/BgImg.png")}
        style={styles.picture}
      >
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
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Lottie
                    style={{ width: 200, height: 200 }}
                    source={Locgif}
                    autoPlay
                    loop
                  />
                </View>
              ) : (
                <>
                  <Text style={styles.text1}>{data?.name}</Text>
                  <Text style={styles.text}>
                    {tempchangertoC(data?.main.temp)}°
                  </Text>
                  <Text style={styles.text_grey}>{data?.weather[0].main}</Text>
                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <Text style={styles.text2}>
                      H:{tempchangertoC(data?.main.temp_max)}°
                    </Text>
                    <Text style={styles.text2}>
                      L:{tempchangertoC(data?.main.temp_min)}°
                    </Text>
                  </View>
                </>
              )}
            </LinearGradient>
          </BlurView>
        </View>
        <View style={styles.bottomView}>
          <Image source={require("../assets/imgs/House.png")} />
          {/* <BlurView
          style={styles.blur}
          blurType="light"
          blurAmount={20}
          reducedTransparencyFallbackColor="white"
        /> */}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  picture: {
    flex: 1,
  },
  conatiner: {
    flex: 1,
    justifyContent: "center",
  },
  con: {
    width: "75%",
    alignSelf: "center",
    marginTop: 100,
  },
  linearGradient: {
    flex: 1,
    borderRadius: 20,
  },
  bottomView: {
    // position: "absolute",
    bottom: 0,
    top: "7%",
    justifyContent: "center",
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
