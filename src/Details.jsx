import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { GlobalStyles } from "./GlobalStyles";
import MyView from "./MyView";
import { BlurView } from "@react-native-community/blur";
import dayjs from 'dayjs';



export default function Details({ data, airpollute }) {

  const data1 = [
    { key: `Sunrise: ${dayjs.unix(data.sys.sunrise).format('h:mm:ss A')}` },
    { key: `Sunset: ${dayjs.unix(data.sys.sunset).format('h:mm:ss A')}` },
    { key: `Pressure: ${data.main.pressure}` },
    { key: `Humidity: ${data.main.humidity}` },
    { key: `Wind: Speed: ${data.wind.speed}° Degree: ${data.wind.deg}` },
  ];

  return (
    <LinearGradient
      colors={["#45278B", "#2E335A"]}
      start={{ x: 1, y: 1.7 }}
      end={{ x: 2, y: 0.5 }}
      locations={[0, 1]}
      style={styles.gradient}
    >

      <View style={styles.mainView}>
      <BlurView
        style={GlobalStyles.absolute}
        Type="light"
        Amount={20}
        reducedTransparencyFallbackColor="white"
      >
         <Text style={GlobalStyles.txt}>
            Air Quality: {airpollute.list[0].main.aqi}
          </Text>
      </BlurView>
    </View>

      <FlatList
        data={data1}
        renderItem={({ item }) => (
          <MyView props={<Text style={GlobalStyles.txt}>{item.key}</Text>} />
        )}
        numColumns={2}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    mainView:{
        margin: 10,
        padding: 50,
        backgroundColor: "#2B225A",
        borderColor: "#000",
        borderWidth: 1.5,
        borderRadius: 20,
    },
  gradient: {
    flex: 1,
    paddingTop: 50,
  },
});
