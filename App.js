import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./src/Tabs";
import { StatusBar } from "expo-status-bar";



export default function App() {
  return (
    <NavigationContainer>
    <Tabs/>
    <StatusBar style="auto" />
    </NavigationContainer>
  );
}