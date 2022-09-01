import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

function DimensionsTest() {
  const [dimensions, setDimensions] = useState({ window, screen });

  const onChange = ({ window, screen }) => {
    console.log('onChange');
    setDimensions({ window, screen });
  };

  useEffect(() => {
    console.log('useEffect');
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{`Window width - ${dimensions.window.width}`}</Text>
      <Text style={styles.textStyle}>{`Window height - ${dimensions.window.height}`}</Text>
      <Text style={styles.textStyle}>{`Screen width - ${dimensions.screen.width}`}</Text>
      <Text style={styles.textStyle}>{`Screen height - ${dimensions.screen.height}`}</Text>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textStyle: {
    fontWeight: 'bold',
    color: 'red',
    fontSize: 30
 },
});

export default DimensionsTest;