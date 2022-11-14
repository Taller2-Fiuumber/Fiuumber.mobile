import * as React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar} from "react-native";
import { Text, View } from "../components/Themed";
import { Pallete } from '../constants/Pallete';
import { User } from '../models/user';
import { Image, Pressable } from "react-native";
import { AuthService } from '../services/AuthService';
import PassengerRatingForm from "../components/PassengerRatingForm";
import DriverRatingForm from "../components/DriverRatingForm";
import { useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { Rating, AirbnbRating } from 'react-native-ratings';
import { TextInput, Button } from 'react-native-paper';



const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: Pallete.whiteColor,
      paddingTop: StatusBar.currentHeight,

    },
    scrollView: {
      marginHorizontal: "3%",
    },
    contentContainer: {
      flex: 1,
      margin: "5%",
      backgroundColor: Pallete.whiteColor,
    },
    description: {
      color: Pallete.contentColor,
      fontSize: 16,
      textAlign: 'center',
    },
    title: {
      fontSize: 35,
      fontWeight: 'bold',
      color: Pallete.darkColor,
      textAlign: "center",
      margin: '3%',
    },
    subtitle: {
      fontSize: 25,
      color: Pallete.darkBackground,
      textAlign: "center",
      margin:'3%',
    },
});

export const CalificationScreen = () => {

  const ratingCompleted = (rating: number)=> {
    console.log("Rating is: " + rating)
  }
    const user = AuthService.getCurrentUserToken()?.user;
    return (
      
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Califíca a tu { user?.profile == "PASSENGER" ?
            "Chofer":
            "Pasajero"
          }</Text>
        <Rating
          showRating
          onFinishRating={ratingCompleted}
          style={{ paddingVertical: 10 }}
        />
         { user?.profile == "PASSENGER" ?
            <PassengerRatingForm></PassengerRatingForm> :
            <DriverRatingForm></DriverRatingForm>
          }
          <Button mode="contained" style={{backgroundColor: Pallete.primaryColor}} onPress={console.log("envio")}> Calificar </Button>
        </View>
        </ScrollView>
    </SafeAreaView>

    );
  }

  export default CalificationScreen;
