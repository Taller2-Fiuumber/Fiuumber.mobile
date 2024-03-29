import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Pallete } from "../constants/Pallete";
import { NavigationProps } from "../types";

export const OnBoardingScreen = ({ navigation }: NavigationProps) => {

    return (
    <>
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
        <Image source={require('../assets/images/onBoarding.png')} style={styles.image} />
        </View>
        <Text style={styles.title}>Fiuumber</Text>
        <Text style={styles.title}>enjoy the ride</Text>
        <Text style={styles.description}>Request a ride. Experience the thrill at a lower price.</Text>
        <Pressable style={{...styles.button, ...styles.bgLogIn, ...{marginBottom: 20}}} onPress={() => navigation.navigate('LogInScreen')}>
          <Text style={{...styles.buttonText, ...styles.colorLogIn}}>Sign In</Text>
        </Pressable>
        <Pressable style={{...styles.button, ...styles.bgSignUp}} onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={{...styles.buttonText, ...styles.colorSignUp}}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
    </>
    );
  }
  
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Pallete.darkBackground,
      fontFamily: 'Roboto',
    },
    container: {
      position: 'absolute',
      bottom: '5%',
      left: 0,
      right: 0,
      padding: 30,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 0,
      marginBottom: 0,
    },
    title: {
      fontSize: 35,
      fontWeight: 'bold',
      color: Pallete.whiteColor,
      textAlign: "center",
      marginBottom:'3%'
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
  