import { StyleSheet, FlatList, Text } from "react-native";
import React, { useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat"; // Plugin for custom date parsing format
import utc from "dayjs/plugin/utc"; // Plugin for UTC handling

import "dayjs/locale/en"; // Example: Import English locale
import { GlobalStyles } from "./GlobalStyles";
import NewView from "./NewView";

dayjs.extend(customParseFormat);
dayjs.extend(utc);

export default function FivedayForecast({ data }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (data) {
        setLoading(false);
      } // Set loading to false after a delay
    }, 2000);
  }, [data]);

  const lists = [
    { id: 0, value: `${data.list[7]}` },
    { id: 1, value: `${data.list[15]}` },
    { id: 2, value: `${data.list[23]}` },
    { id: 3, value: `${data.list[31]}` },
    { id: 4, value: `${data.list[39]}` },
  ];
  return (
    <LinearGradient
      colors={["#45278B", "#2E335A"]}
      start={{ x: 1.9, y: 1.7 }}
      end={{ x: 1.9, y: 1.2 }}
      locations={[0, 1]}
      style={styles.gradient}
    >
      {/* <NewView props={data?.list[7]}/> */}
      {loading ? (
        <Text>Loading.....</Text>
      ) : (
        <>
          <FlatList
            data={lists}
            keyExtractor={(item, index) => index.id}
            renderItem={({ item, index }) => <NewView props={index} display ={item.value}/>}
          />
        </>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    paddingTop: 50,
  },
});
