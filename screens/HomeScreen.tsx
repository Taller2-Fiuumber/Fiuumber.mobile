import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    },
    title: {
        color: 'red'
    },
});
export const HomeScreen = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Esto es el Home</Text>
      </View>
    );
  }
  