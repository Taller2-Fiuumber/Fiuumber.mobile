import * as React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar} from "react-native";
import { Text, View } from "../components/Themed";
import { Pallete } from '../constants/Pallete';
import { User } from '../models/user';
import { Image, Pressable } from "react-native";
import { AuthService } from '../services/AuthService';
import {PassengerProfileForm} from "../components/PassengerProfileForm";
import {DriverProfileForm} from "../components/DriverProfileForm";
import { useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { Rating, AirbnbRating } from 'react-native-ratings';

export const CalificationScreen = () => {

  const ratingCompleted = (rating: number)=> {
    console.log("Rating is: " + rating)
  }

    return (
      <>
        <View>
        <Rating
          showRating
          onFinishRating={ratingCompleted}
          style={{ paddingVertical: 10 }}
        />

      </View>
      </>
    );
  }

  export default CalificationScreen;
