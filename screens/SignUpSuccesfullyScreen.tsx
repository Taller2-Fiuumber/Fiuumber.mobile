import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Pallete } from "../constants/Pallete";
import { NavigationProps } from "../types";

export const SignUpSuccesfullyScreen = ({ navigation }: NavigationProps) => {

    return (
    <>
    <View style={styles.mainContainer}>
  
      <View style={styles.container}>
        <View style={styles.imgContainer}>
        <Image source={require('../assets/images/tick.png')} style={styles.image} />
        </View>
        <Text style={styles.title}>Your Sign Up was successfull</Text>
        <Pressable style={{...styles.button, ...styles.bgSignUp, ...{marginBottom: 20}}} onPress={() => navigation.navigate('LogInScreen')}>
          <Text style={{...styles.buttonText, ...styles.colorSignUp}}>Continue</Text>
        </Pressable>
        <View style={styles.imgContainer}>
        <Image source={require('../assets/images/vehicle_ok.png')} style={styles.bottom_image} />
        </View>
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
      backgroundColor: Pallete.whiteColor,
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
      fontSize: 25,
      color: Pallete.darkColor,
      margin: 0,
      paddingTop:'10%',
      paddingBottom: '10%',
      paddingLeft:'4%'
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
    image: { height: 75, borderRadius: 20, width: 100, marginLeft:'40%' },
    bottom_image: { height: 330, width: '110%', marginLeft:-15, marginBottom:-125},
    imgContainer: {width: '100%', textAlign: 'center', marginBottom: 50},

  });
  