import React, { FC, ReactElement, useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView, StatusBar} from "react-native";
import { Text, View } from "../components/Themed";
import { Pallete } from '../constants/Pallete';
import { User } from '../models/user';
import { Image, Pressable } from "react-native";
import { AuthService } from '../services/AuthService';

import AuthContext from "../contexts/AuthContext";
import { Rating, AirbnbRating } from 'react-native-ratings';
import { TextInput, Button } from 'react-native-paper';
import axios from "axios";
// import { HEADERS, RAW_HEADERS, URL_AUTH, URL_USERS } from "../Constants";
import { Trip, Calification } from '../models/trip';
import { TripsService } from '../services/TripsService';


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


export const CalificationScreen = (tripId: string) => {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");

  const ratingCompleted = (_rating: number)=> {
    // console.log("Rating is: " + rating)
    setRating(_rating);
  }

  const createReview = (_review: string)=> {
    // console.log(review);
    setReview(_review);
  }

  const user = AuthService.getCurrentUserToken()?.user;

  const createCalification = async () => {

      const tripStatus = "066de609-b04a-4b30-b46c-32537c7f1f6e"

      const trip: Trip | null = await TripsService.get(tripStatus);

      if (trip != null) {
          const _calification: Calification | null = await TripsService.createCalification(
            trip.passengerId,
            trip.driverId,
            trip._id,
            rating,
            review,
            user?.profile);
          return true;
      }
    }

  return (

  <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>
      <View style={styles.contentContainer}>
      <Text style={styles.subtitle}>Rate your { user?.profile == "PASSENGER" ?
          "driver":
          "passenger"
        }</Text>
      <Rating
        showRating
        onFinishRating={ratingCompleted}
        style={{ paddingVertical: 10 }}
      />
        <Text style={styles.subtitle}>How was your trip? Give a compliment! </Text>
        <TextInput label="Write a note" style={{marginBottom: 20}} onChangeText={text=> createReview(text)} />
        <Button mode="contained" style={{backgroundColor: Pallete.primaryColor}} onPress={createCalification}> Submit </Button>
      </View>
      </ScrollView>
  </SafeAreaView>

    );
  }

  export default CalificationScreen;
