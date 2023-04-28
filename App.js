import { StatusBar } from "expo-status-bar";
import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import Weathercall from "./src/Weathercall";


export default function App() {
  return (
    <View style={styles.container}>
    <ImageBackground source={require("./assets/imgs/BgImg.png")} style={styles.pic}>  
      <Weathercall />
      <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pic: {
    flex: 1,
  },
});