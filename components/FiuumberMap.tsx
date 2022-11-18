import React, { FC, ReactElement, useEffect, useState } from "react";

import { Pallete } from "../constants/Pallete";
import { Dimensions, StyleSheet, Image, View, Text } from "react-native";
import MapView, { LatLng, Marker as RNMarker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

interface FiuumberMapProps {
  onMapRef: (ref: any) => void;
  origin: LatLng | null;
  destination: LatLng | null;
  position: LatLng | null;
}

export const FiuumberMap: FC<FiuumberMapProps> = ({ origin, destination, onMapRef, position }: FiuumberMapProps): ReactElement => {

  const [_mapRef, _setMapRef] = useState<any | null>(null);

  const { width, height } = Dimensions.get('window');

  const carImage = require("../assets/icons/car.png");

  const setRef = (ref: any) => {
    _setMapRef(ref);
    onMapRef(ref);
  }

  useEffect(() => { console.log(origin); console.log(destination) }, [origin, destination])

  return (
    <>
      <MapView
        ref={setRef}
        style={{ width: '100%', height: "100%" }}
        initialRegion={{
          latitude: -34.6175841,
          longitude: -58.3682286,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onLayout={() => { }}
      >
        {position && (<RNMarker key="realTimeLocationKey" coordinate={position} identifier="mkRealtimeLocation" pinColor="turquoise">
          {/* <Image
            source={carImage}
            style={{ width: 26, height: 28, rotation: -90 }}
            resizeMode="contain"
          /> */}
        </RNMarker>)}
        {destination && (<RNMarker key="destination" coordinate={destination} identifier="mkDestination" />)}
        {origin && destination ?
          <MapViewDirections
            origin={origin}
            destination={destination}
            // apikey="AIzaSyBfs3U9Y_wu6bVrUKC737-Dj_JkWWHGU1I"
            apikey="AIzaSyANbv3JEv2HV3r4Sj9j7Y5yrX3KYQcSmew"
            strokeWidth={5}
            strokeColor="hotpink"
            onReady={result => {
              console.log(`Distance: ${result.distance} km`)
              console.log(`Duration: ${result.duration} min.`)

              _mapRef.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: (width / 20),
                  bottom: (height / 20),
                  left: (width / 20),
                  top: (height / 20),
                }
              });
            }}
          />
          : <></>
        }
      </MapView>
    </>
  )
};

export default FiuumberMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Pallete.greenBackground,
    padding: 20,
  },
});


