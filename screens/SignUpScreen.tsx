import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    title: {
        color: '#000'
    },
});
export const SignUpScreen = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
      </View>
    );
  }
  