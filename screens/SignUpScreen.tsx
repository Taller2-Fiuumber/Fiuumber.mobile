import React from "react";
import { StyleSheet } from "react-native";
import LogInForm from "../components/LogInForm";
import { Text, View } from "../components/Themed";
import { Pallete } from "../constants/Pallete";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: Pallete.greenBackground,
      padding: 20,
    },
    title: {
        color: '#000',
        marginBottom: 70,
        textAlign: 'center',
        fontSize: 24
    },
});
export const SignUpScreen = () => {
    return (
      <>
      <View style={styles.container}>
        <Text style={styles.title}>Sign up to Fiuumber</Text>
      </View>
      </>
    );
  }
  