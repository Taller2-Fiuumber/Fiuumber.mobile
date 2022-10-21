import * as React from 'react';
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { Pallete } from '../constants/Pallete';
import { DirectionsBoxNative } from '../components/DirectionsBoxNative';

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: Pallete.greenBackground,
      padding: "5%",
    },
    contentContainer: {
      flex: 1,
      backgroundColor: Pallete.greenBackground,
    },
    title: {
      color: Pallete.darkColor,
      textAlign: 'center',
      fontSize: 24
  },
});
export const TripScreen = () => {

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
              <Text style={styles.title}>Choose your next ride!</Text>
              <DirectionsBoxNative></DirectionsBoxNative>
            </View>
        </View>
    );
  }

  export default TripScreen;
