import React, { FC, ReactElement} from "react";
import { TextInput, Button } from 'react-native-paper';
import { Pallete } from "../constants/Pallete";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";

// Guide  https://github.com/trulymittal/google-maps-directions-tutorial
import {
  GoogleMap,Marker,useJsApiLoader,DirectionsRenderer,Autocomplete, Libraries
} from '@react-google-maps/api'



const center = {
  lat: -34.6175841,
  lng: -58.3682286,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Pallete.whiteColor,
    padding: 20,
  },
  map: {
    flex: 1,
    justifyContent: 'center',
    padding: "10%",
    backgroundColor: Pallete.whiteColor,
  },
  descriptionRoute: {
    color: Pallete.darkColor,
    fontSize: 12
  },
  welcomeText: {
    color: Pallete.darkColor,
    fontWeight: 'bold',
    margin: 10,
    fontSize: 20
  },
  button: {
    color: Pallete.greenBackground,
    margin: 10,
  }
});


const map_libraries: Libraries[] = ['places', 'directions'];

//type Libraries = ("drawing" | "geometry" | "localContext" | "places" | "visualization")[]

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


  let originRef = React.useRef('Palermo, Buenos Aires')
  let destiantionRef = React.useRef('San Telmo, Buenos Aires')
  const [distance, setDistance] = React.useState('')
  const [duration, setDuration] =  React.useState('')

  let [searchOriginQuery, setSearchOriginQuery] = React.useState<string>("");
  let [searchDestinationQuery, setSearchDestinationQuery] = React.useState<string>("");
  let [autocomplete, setAutocomplete] = React.useState<google.maps.places.Autocomplete>();
  let [directionsResponse, setDirectionsResponse] = React.useState<google.maps.DirectionsResult>()


  const calculateRoute = React.useCallback(async function callback(origin:string, destination: string) {

    console.log("Looking for route between {searchOriginQuery} and {searchDestinationQuery}");

    if (origin === '' || destination === '') {
      console.log("No locations");
      return
    }

    const directionsService = new google.maps.DirectionsService()
    let results = await directionsService.route({
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    })

    console.log(directionsService)

    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)

    console.log(results)
  }, [])



  const onPlaceChangedAutocomplete = React.useCallback(function callback() {
    if (autocomplete) {
      console.log(autocomplete.getPlace().name);
    }
  }, [])


  const onPress = () => {
    console.log("Looking for directions...")
    calculateRoute(searchOriginQuery, searchDestinationQuery);
  }

  return isLoaded ? (
    <View style={styles.container}>

      <Text style={styles.welcomeText}>Origin</Text>
      <Autocomplete
        onLoad = {(text) => setAutocomplete(text)}
        onPlaceChanged={onPlaceChangedAutocomplete}
      >
        <TextInput left={<TextInput.Icon icon="magnify" />} label="Enter your route" value={searchOriginQuery} style={{marginBottom: 20}} onChangeText={(text) => setSearchOriginQuery(text)}/>
      </Autocomplete>

      <Text style={styles.welcomeText}>Destination</Text>
      <Autocomplete
        onLoad = {(text) => setAutocomplete(text)}
        onPlaceChanged={onPlaceChangedAutocomplete}
      >
        <TextInput
          left={<TextInput.Icon icon="magnify" />}
          label="Enter your route"
          value={searchDestinationQuery}
          style={{marginBottom: 20}}
          onChangeText={(text) => setSearchDestinationQuery(text)}/>
      </Autocomplete>

      <GoogleMap
        mapContainerStyle={styles.map}
        center={center}
        onLoad={onLoad}
      >
        <Marker position={center} />
        <Marker position={center} />

        {directionsResponse != null && (
            <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>

      <Text style={styles.descriptionRoute}>Duration: {duration}</Text>
      <Text style={styles.descriptionRoute}>Distance: {distance}</Text>

      <Button mode="contained" style={styles.button} onPress={onPress}>Search</Button>

    </View>
  ) : <></>
};

export default DireccionBox;
