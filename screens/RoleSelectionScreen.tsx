import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Pallete } from "../constants/Pallete";
import { Passenger } from "../models/passenger";
import { AuthService } from "../services/AuthService";
import { StorageService } from "../services/StorageService";
import { NavigationProps } from "../types";

export const RoleSelectionScreen = ({ navigation }: NavigationProps) => {

    const createPassenger = async () => {
      const strPassenger: string | null = await StorageService.getData("temp_user");
      if (!strPassenger) return;
      const passenger: Passenger = JSON.parse(strPassenger);
      console.log(passenger);
      await AuthService.registerPassenger(passenger);
      navigation.navigate('SignUpSuccesfullyScreen');
    }

    return (
    <>
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>How will you use Fiuumber?</Text>
        <View style={styles.imgContainer}>
        <Image source={require('../assets/images/roleSelectionImg.png')} style={styles.image} />
        </View>
        <Pressable style={{...styles.button, ...styles.bgPassenger, ...{marginBottom: 20}}} onPress={createPassenger}>
          <Text style={{...styles.buttonText, ...styles.colorPassenger}}>I'm a <Text style={{...styles.buttonText, ...styles.colorPassenger,...{fontWeight: "bold"}}}>passenger</Text></Text>
        </Pressable>
        <Pressable style={{...styles.button, ...styles.bgDriver}} onPress={() => navigation.navigate('VehicleDataScreen')}>
          <Text style={{...styles.buttonText, ...styles.colorPassenger}}>I'm a <Text style={{...styles.buttonText, ...styles.colorPassenger,...{fontWeight: "bold"}}}>driver</Text></Text>
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
      backgroundColor: Pallete.greenBackground,
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
      margin: 0
    },
    header: {
      color: Pallete.darkColor,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center', 
      fontSize: 30
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
      fontWeight: 'normal',
    },
    colorPassenger: {
      color: Pallete.primaryColor
    },
    bgPassenger: {
      backgroundColor: Pallete.lightColor,
    },
    bgDriver: {
      backgroundColor: Pallete.lightColor,
    },
    colorDriver: {
      color: Pallete.primaryColor,
    },
    image: { height: 200, borderRadius: 20, width:'100%' },
    imgContainer: {width: '100%', textAlign: 'center', marginBottom: 50, position: 'relative', alignSelf:'center'},

  });