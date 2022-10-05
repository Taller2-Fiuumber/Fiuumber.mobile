import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { NavigationProps } from "../types";

const Stack = createNativeStackNavigator();

export const WelcomeScreen = ({ navigation }: NavigationProps) => {

    return (
    <>
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
        <Image source={require('../assets/images/welcome.png')} style={styles.image} />
        </View>
        <Text style={styles.title}>Fiuumber</Text>
        <Text style={styles.title}>enjoy the ride</Text>
        <Text style={styles.description}>Premium and prestige car daily rental.Experience the thrill at a lower price.</Text>
        <Pressable style={{...styles.button, ...styles.bgSignIn, ...{marginBottom: 20}}} onPress={() => navigation.navigate('SignInScreen')}>
          <Text style={{...styles.buttonText, ...styles.colorSignIn}}>Sign In</Text>
        </Pressable>
        <Pressable style={{...styles.button, ...styles.bgSignUp}} onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={{...styles.buttonText, ...styles.colorSignUp}}>Sign Up</Text>
        </Pressable>
        {/* <button style={{...styles.button, ...styles.colorBtnSignIn, ...{marginBottom: '20px'}}} onClick={() => navigation.navigate('SignUpScreen')}>Sign Up</button> */}
        {/* <button style={{...styles.button, ...styles.colorBtnSignUp}} onClick={() => navigation.navigate('SignInScreen')}>Log In</button> */}
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
      backgroundColor: '#2C2B34',
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
      color: '#FFFFFF',
      margin: 0
    },
    description: {
      fontSize: 15,
      fontWeight: 'normal',
      color: '#8E8E8E',
      marginBottom: 20
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
    colorSignIn: {
      color: '#2D4990'
    },
    bgSignIn: {
      backgroundColor: '#F5F5F5',
    },
    bgSignUp: {
      backgroundColor: '#2D4990',
    },
    colorSignUp: {
      color: '#F5F5F5',
    },
    image: { height: 330, borderRadius: 20, maxWidth: 300 },
    imgContainer: {width: '100%', textAlign: 'center', marginBottom: 50},

  });
  