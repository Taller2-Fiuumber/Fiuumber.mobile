import React, { FC, useState } from "react";
import { StyleSheet, StatusBar, View } from "react-native";
import { Pallete } from '../constants/Pallete';
import { AuthService } from '../services/AuthService';

import { Rating } from 'react-native-ratings';
import { TextInput, Button, Text } from 'react-native-paper';
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
    margin: 5,
    backgroundColor: Pallete.whiteColor,
  },
  description: {
    color: Pallete.contentColor,
    fontSize: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    color: Pallete.darkColor,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: Pallete.darkBackground,
    textAlign: "center",
    margin: '3%',
  },
  congratsText: {
    fontSize: 20,
    color: Pallete.greenBackground,
    textAlign: 'center',
    marginTop: 10
  }
});

interface CalificationScreenProps {
  tripId: string;
  onCalification: (Calification: Calification) => void;
}

export const CalificationScreen: FC<CalificationScreenProps> = ({ tripId, onCalification }: CalificationScreenProps) => {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [calification, setCalification] = useState<Calification | null>(null);

  const ratingCompleted = (_rating: number) => {
    setRating(_rating);
  }

  const createReview = (_review: string) => {
    setReview(_review);
  }

  const user = AuthService.getCurrentUserToken()?.user;

  const createCalification = async () => {

    try {
      setLoading(true);
      const trip: Trip | null = await TripsService.get(tripId);

      if (trip != null) {
        const _calification: Calification | null = await TripsService.createCalification(
          trip.passengerId,
          trip.driverId,
          trip._id,
          rating,
          review,
          user?.profile);
        if (_calification) {
          setCalification(_calification);
          onCalification(_calification)
        }
        return true;
      }
    }
    catch (e: any) {
      console.error(e);
      throw e;
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Rate your {user?.profile == "PASSENGER" ?
          "driver" :
          "passenger"
        }</Text>
        <Rating
          showRating
          onFinishRating={ratingCompleted}
          style={{ paddingVertical: 10 }}
        />
        {
          !calification && (
            <>
              <Text style={styles.subtitle}>How was your trip? Give a compliment!</Text>
              <TextInput mode="outlined" label="Write a note" style={{ marginBottom: 20, backgroundColor: Pallete.whiteColor, }} onChangeText={text => createReview(text)} />
              <Button mode="contained" buttonColor={Pallete.greenBackground} textColor={Pallete.whiteColor} loading={loading} onPress={createCalification}>Submit</Button>
            </>
          )
        }
        {
          calification && (<Text style={styles.congratsText}>Rating submitted</Text>)
        }
      </View>
    </>
  );
}

export default CalificationScreen;
