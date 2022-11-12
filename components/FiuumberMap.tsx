import React, { FC, ReactElement, useState } from "react";

import { Pallete } from "../constants/Pallete";
import { Dimensions, StyleSheet } from "react-native";
import MapView, { LatLng, Marker as RNMarker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { Marker } from "../models/marker";

interface FiuumberMapProps {
  markers: Marker[] | null;
  onMapRef: (ref: any) => void;
  origin: LatLng | null;
  destination: LatLng | null;
}

export const FiuumberMap: FC<FiuumberMapProps> = ({ markers, origin, destination, onMapRef }: FiuumberMapProps): ReactElement => {

  const [_mapRef, _setMapRef] = useState<any | null>(null);

  const { width, height } = Dimensions.get('window');

  const setRef = (ref: any) => {
    _setMapRef(ref);
    onMapRef(ref);
  }

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
        {markers ? markers.map(marker => <RNMarker coordinate={marker.coordinate} identifier={marker.identifier} />) : <></>}
        {origin && destination ?
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey="AIzaSyBfs3U9Y_wu6bVrUKC737-Dj_JkWWHGU1I"
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


