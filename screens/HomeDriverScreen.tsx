import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Pallete } from "../constants/Pallete";
import { NavigationProps } from "../types";
import { FirebaseService } from "../services/FirebaseService";
import { ref, get } from "@firebase/database";

export const HomeDriverScreen = ({ navigation }: NavigationProps) => {

  // const []

  const watchTrips = () => {
    const reference = ref(FirebaseService.db, `trips`);
    get(reference).then(snapshot => {
      console.log(snapshot);
    });
  };

  watchTrips();

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text>Hola driver!!!</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Pallete.greenBackground,
    fontFamily: 'Roboto',
  },
  container: {
    bottom: '5%',
    left: 0,
    right: 0,
    paddingLeft: 30,
    paddingRight: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 0,
    marginBottom: 0,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: Pallete.darkColor,
    textAlign: "center",
    marginBottom: '3%',
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
  viewProfileButton: {
    borderRadius: 100,
    width: '100%',
    border: 'none',
    height: 55,
    marginBottom: 20,
    justifyContent: 'center',
  },
  viewProfileButtonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewHistoryButton: {
    borderRadius: 100,
    width: '100%',
    border: 'none',
    height: 55,
    marginBottom: 20,
    justifyContent: 'center',
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
  image: { height: '100%', borderRadius: 20, width: 300 },
  imgContainer: { width: '100%', height: 300, marginBottom: 50, alignItems: 'center', justifyContent: 'center' },

});