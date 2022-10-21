// import React from "react";
// import { Image, Pressable, StyleSheet, Text, View } from "react-native";
// import { Pallete } from "../constants/Pallete";
// import { NavigationProps } from "../types";
// import AuthContext from "../contexts/AuthContext";

// import * as React from 'react';
// import { StyleSheet } from "react-native";
// import { Text, View } from "../components/Themed";
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { Pallete } from '../constants/Pallete';
// import DirectionBox from "../components/DirectionsBox";
// import { DirectionsBoxNative } from '../components/DirectionsBoxNative';

// const styles = StyleSheet.create({
//   container: {
//       flex: 1,
//       justifyContent: 'center',
//       backgroundColor: Pallete.whiteColor,
//       padding: 20,
//     },
//     contentContainer: {
//       flex: 1,
//       backgroundColor: Pallete.whiteColor,
//     },
//     description: {
//       color: Pallete.contentColor,
//       fontSize: 16,
//       textAlign: 'center',
//     },
// });
// export const TripScreen = () => {

//     return (
//       // <GestureHandlerRootView style={{ flex: 1 }}>
//         <View style={styles.container}>
//             <View style={styles.contentContainer}>
//               {/* <DirectionBox></DirectionBox> */}
//               <DirectionsBoxNative></DirectionsBoxNative>
//             </View>
//         </View>
//       // </GestureHandlerRootView>

//     );
//   }







// export const HomeDriverScreen = ({ navigation }: NavigationProps) => {

//   const { signOut } = React.useContext(AuthContext);

//   return (
//     <>
//     <View style={styles.mainContainer}>
//       <View style={styles.container}>
//         <Text>Hola driver!!!</Text>
//       </View>
//     </View>
//     </>
//     );    
  
//     // return (
//     //   <>
//     //   <View style={styles.mainContainer}>
//     //     <View style={styles.container}>
//     //       <Text style={styles.title}>Hello, passenger!</Text>
//     //       <Pressable style={{...styles.viewProfileButton, ...styles.bgLogIn}} onPress={() => navigation.navigate('TripScreen')}>
//     //         <Text style={{...styles.viewProfileButtonText, ...styles.colorLogIn}}> My profile </Text>
//     //       </Pressable>
//     //       <Pressable style={{...styles.viewHistoryButton, ...styles.bgLogIn}} onPress={() => navigation.navigate('TripScreen')}>
//     //         <Text style={{...styles.viewProfileButtonText, ...styles.colorLogIn}}> History </Text>
//     //       </Pressable>   
  
//     //       <Pressable style={{...styles.viewHistoryButton, ...styles.bgLogIn}} onPress={signOut}>
//     //         <Text style={{...styles.viewProfileButtonText, ...styles.colorLogIn}}> Sign out </Text>
//     //       </Pressable>          
  
//     //       <View style={styles.imgContainer}>
//     //       <Image source={require('../assets/images/blueTaxiPng.png')} style={styles.image} />
//     //       </View>
//     //       <Pressable style={{...styles.button, ...styles.bgSignUp}} onPress={() => navigation.navigate('TripScreen')}>
//     //         <Text style={{...styles.buttonText, ...styles.colorSignUp}}> Start Trip </Text>
//     //       </Pressable>
  
          
  
//     //     </View>
//     //   </View>
//     //   </>
//     //   );
//   }
  
//   const styles = StyleSheet.create({
//     mainContainer: {
//       flex: 1,
//       position: 'relative',
//       alignItems: 'center',
//       justifyContent: 'center',
//       backgroundColor: Pallete.greenBackground,
//       fontFamily: 'Roboto',
//     },
//     container: {
//       bottom: '5%',
//       left: 0,
//       right: 0,
//       paddingLeft: 30,
//       paddingRight: 30,
//       marginLeft: 'auto',
//       marginRight: 'auto',
//       marginTop: 0,
//       marginBottom: 0,
//     },
//     title: {
//       fontSize: 35,
//       fontWeight: 'bold',
//       color: Pallete.darkColor,
//       textAlign: "center",
//       marginBottom:'3%',
//       paddingBottom: "10%" 
//     },
//     description: {
//       fontSize: 15,
//       fontWeight: 'normal',
//       color: '#8E8E8E',
//       marginBottom: 20,
//       textAlign: "center",
//     },
//     button: {
//       borderRadius: 100,
//       width: '100%',
//       border: 'none',
//       height: 55,
//       marginBottom: 20,
//       justifyContent: 'center',
//     },
//     buttonText: {
//       textAlign: 'center',
//       fontSize: 20,
//       fontWeight: 'bold',
//     },
//     viewProfileButton: {
//       borderRadius: 100,
//       width: '100%',
//       border: 'none',
//       height: 55,
//       marginBottom: 20,
//       justifyContent: 'center',
//     },
//     viewProfileButtonText: {
//       textAlign: 'center',
//       fontSize: 20,
//       fontWeight: 'bold',
//     },
//     viewHistoryButton: {
//       borderRadius: 100,
//       width: '100%',
//       border: 'none',
//       height: 55,
//       marginBottom: 20,
//       justifyContent: 'center',
//     },
//     colorLogIn: {
//       color: Pallete.primaryColor
//     },
//     bgLogIn: {
//       backgroundColor: Pallete.lightColor,
//     },
//     bgSignUp: {
//       backgroundColor: Pallete.primaryColor,
//     },
//     colorSignUp: {
//       color: Pallete.lightColor,
//     },
//     image: { height: '100%', borderRadius: 20, width: 300},
//     imgContainer: {width: '100%', height: 300, marginBottom: 50, alignItems: 'center', justifyContent: 'center'},

//   });
  