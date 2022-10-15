import * as React from 'react';
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Pallete } from '../constants/Pallete';
import DirectionBox from "../components/DirectionsBox";

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: Pallete.whiteColor,
      padding: 20,
    },
    contentContainer: {
      flex: 1,
      backgroundColor: Pallete.whiteColor,
    },
    description: {
      color: Pallete.contentColor,
      fontSize: 16,
      textAlign: 'center',
    },
});
export const HomeScreen = () => {

    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
            <View style={styles.contentContainer}>
              <Text style={styles.description}>Select your ride!</Text>
              <DirectionBox></DirectionBox>
            </View>
        </View>
      </GestureHandlerRootView>

    );
  }

  export default HomeScreen;
