import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "./GlobalStyles";
import dayjs from "dayjs";

export default function NewView({ display, props }) {
  const tempchangertoC = (num) => {
    return Math.round(num - 273.15);
  }; 
  console.log("View: ",display);
  return (

      <View style={styles.container}>
        <Text style={GlobalStyles.txt}>
          {dayjs.unix(display?.dt).format("dddd, D MMMM")}
        </Text>
        <Text style={GlobalStyles.txt}>{tempchangertoC(display?.main?.temp)}°</Text>
        <Text style={GlobalStyles.txt}>
          Feels Like: {tempchangertoC(display?.main?.feels_like)}°
        </Text>
        <Text style={GlobalStyles.txt}>Humidity: {display?.main?.humidity}</Text>
        <Text style={GlobalStyles.txt}>{display?.weather[0]?.description}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#2B225A",
    borderColor: "#fff",
    borderWidth: 1.5,
    borderRadius: 25,
  },
  gradient: {
    flex: 1,
    paddingTop: 50,
  },
});
