import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Pallete } from "../constants/Pallete";
import { NavigationProps } from "../types";

// import { set, ref } from "firebase/database";
// import { FirebaseService } from "../services/FirebaseService";

export const WelcomeScreen = ({ navigation }: NavigationProps) => {

    // const testFirebase = () => {
    //   const reference = ref(FirebaseService.db, 'test/pepe');
    //   set(reference, {
    //     saludo: "Alohaaaa",
    //   });
    // }

    // testFirebase();

    return (
    <>
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
        <Image source={require('../assets/images/welcome.png')} style={styles.image} />
        </View>
        <Text style={styles.title}>Fiuumber</Text>
        <Text style={styles.title}>enjoy the ride</Text>
        <Text style={styles.description}>Request a ride. Experience the thrill at a lower price.</Text>
        <Pressable style={{...styles.button, ...styles.bgLogIn, ...{marginBottom: 20}}} onPress={() => navigation.navigate('OnBoardingScreen')}>
          <Text style={{...styles.buttonText, ...styles.colorLogIn}}> Let's Go</Text>
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
    image: { height: 330,borderRadius: 15, width: '110%', marginLeft:'-9%' },
    bottom_image: { height: 330, width: '110%', marginLeft:-15, marginBottom:-125},
    imgContainer: {width: '100%', textAlign: 'center', marginBottom: 50},

  });
  