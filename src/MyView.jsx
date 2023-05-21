import {View } from "react-native";
import React from "react";
import { GlobalStyles } from "./GlobalStyles";
import { BlurView } from "@react-native-community/blur";

export default function MyView({ props }) {
  return (
    <View style={GlobalStyles.container}>
      <BlurView
        style={GlobalStyles.absolute}
        Type="light"
        Amount={20}
        reducedTransparencyFallbackColor="white"
      >
        {props}
      </BlurView>
    </View>
  );
}

