import React, { FC, ReactElement, Component} from "react";
import { TextInput, Button } from 'react-native-paper';
import { Pallete } from "../constants/Pallete";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";

// Guide  https://github.com/trulymittal/google-maps-directions-tutorial
import {
  GoogleMap,useJsApiLoader,Autocomplete, Libraries
} from '@react-google-maps/api'

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -34.6175841,
  lng: -58.3682286,
};

const map_libraries: Libraries[] = ['places'];

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
  contentContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: Pallete.whiteColor,
  },
  description: {
    color: Pallete.contentColor,
    fontSize: 12
  },
  welcomeText: {
    color: Pallete.darkColor,
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 16
  }
});
export const DireccionBox = (): ReactElement => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    libraries: map_libraries,
    googleMapsApiKey: "AIzaSyBfs3U9Y_wu6bVrUKC737-Dj_JkWWHGU1I"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
  const [_searchQuery, setSearchQuery] = React.useState<string>("");


  return isLoaded ? (
    <>

    <Text style={styles.welcomeText}>Origin</Text>
    <Autocomplete>
       <TextInput left={<TextInput.Icon icon="magnify" />} label="Enter your route" style={{marginBottom: 20}} onChangeText={(text) => setSearchQuery(text)}/>
    </Autocomplete>

    <Text style={styles.welcomeText}>Destination</Text>
    <Autocomplete>
       <TextInput left={<TextInput.Icon icon="magnify" />} label="Enter your route" style={{marginBottom: 20}} onChangeText={(text) => setSearchQuery(text)}/>
    </Autocomplete>

    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >

    </GoogleMap>
    </>
  ) : <></>
};

export default DireccionBox;
