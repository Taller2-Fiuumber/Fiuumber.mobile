import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Pallete } from "../constants/Pallete";
import { NavigationProps } from "../types";
import AuthContext from "../contexts/AuthContext";
import { DirectionsBoxNative } from '../components/DirectionsBoxNative';

export const HomeScreen = ({ navigation }: NavigationProps) => {

  const { signOut } = React.useContext(AuthContext);

  return (
    <>
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome back!</Text>
        <Text style={styles.subtitle}>Look for a ride</Text>
            <View style={styles.contentContainer}>
              {/* <DirectionBox></DirectionBox> */}
              <DirectionsBoxNative></DirectionsBoxNative>
            </View>
      </View>
    </View>
    </>
    );
  }

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: Pallete.greenBackground,
      fontFamily: 'Roboto',
      padding: "5%"
    },
    contentContainer: {
      flex: 1,
      backgroundColor: Pallete.whiteColor,
    },
    container: {
      flex: 1,
      height: "50%",
    },
    title: {
      fontSize: 35,
      fontWeight: 'bold',
      color: Pallete.darkColor,
      textAlign: "center",
      marginBottom:'3%',
      paddingBottom: "10%"
    },
    subtitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: Pallete.darkColor,
      textAlign: "left",
      marginBottom:'3%',
      paddingBottom: "10%"
    },
    description: {
      fontSize: 15,
      fontWeight: 'normal',
      color: '#8E8E8E',
      marginBottom: 20,
      textAlign: "center",
    },
    button: {
      borderRadius: 100,
      width: '100%',
      border: 'none',
      height: 55,
      marginBottom: 20,
      justifyContent: 'center',
    },
    buttonText: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
    },
    colorLogIn: {
      color: Pallete.primaryColor
    },
    bgLogIn: {
      backgroundColor: Pallete.lightColor,
    },
    bgSignUp: {
      backgroundColor: Pallete.primaryColor,
    },
    colorSignUp: {
      color: Pallete.lightColor,
    },
    image: { height: '100%', borderRadius: 20, width: 300},
    imgContainer: {width: '100%', height: 300, marginBottom: 50, alignItems: 'center', justifyContent: 'center'},

  });
