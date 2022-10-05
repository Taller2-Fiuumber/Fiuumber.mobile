import * as React from 'react';
import { Dimensions, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    },
    title: {
        color: 'red'
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
});
export const HomeScreen = () => {
    return (
      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }} />
      </View>
    );
  }