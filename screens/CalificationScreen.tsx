import * as React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar} from "react-native";
import { Text, View } from "../components/Themed";
import { Pallete } from '../constants/Pallete';
import { User } from '../models/user';
import { Image, Pressable } from "react-native";
import { AuthService } from '../services/AuthService';
import { useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { Rating, AirbnbRating } from 'react-native-ratings';
import { TextInput, Button } from 'react-native-paper';
import axios from "axios";
// import { HEADERS, RAW_HEADERS, URL_AUTH, URL_USERS } from "../Constants";



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

  const ratingCompleted = (rating: number)=> {
    // console.log("Rating is: " + rating)
    setRating(rating);
  }

  const createReview = (review: string)=> {
    // console.log(review);
    setReview(review);
  }

  const getTrip = async () => {
    
  }
  const createCalification = async () => {
    try {
      const url = `https://fiuumber-api-trips.herokuapp.com/api/trips/trip/${tripId}`;
      let trip =  await axios.get(url, AuthService.getHeaders());
      try {
        const url = `https://fiuumber-api-trips.herokuapp.com/api/trips/calification`;
        await axios.post(url, {
          "passengerId": trip.passengerId,
          "driverId": trip.driverId,
          "tripId": trip.id,
          "createdAt": "2022-11-14T20:19:18.051817",
          "updatedAt": "2022-11-14T20:19:18.051820",
          "stars": {rating},
          "comments": {review},
          "reviewer": user?.profile,
        }, AuthService.getHeaders());
        return true;
      }
      catch (error: any) {
          console.log(error);
          throw error;
      }
    }
    catch (error: any) {
        console.log(error);
        throw error;
    }
  }
  const user = AuthService.getCurrentUserToken()?.user;
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
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
