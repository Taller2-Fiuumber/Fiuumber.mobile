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
  errorMessage: {
    color: "#FF0000",
    fontSize: 12,
    textAlign: "center"
  },
  welcomeText: {
    color: Pallete.darkColor,
    fontWeight: 'bold',
    margin: 10,
    fontSize: 12
  },
  inputText: {
    color: Pallete.darkBackground,
    marginBottom: 14,
    fontSize: 12
  },
  button: {
    color: Pallete.darkBackground,
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
  const [routeNotFound, setRouteNotFound] =  React.useState('')

  let [searchOriginQuery, setSearchOriginQuery] = React.useState<string>("");
  let [searchDestinationQuery, setSearchDestinationQuery] = React.useState<string>("");
  let [autocomplete, setAutocomplete] = React.useState<google.maps.places.Autocomplete>();
  let [directionsResponse, setDirectionsResponse] = React.useState<google.maps.DirectionsResult>()


  const calculateRoute = React.useCallback(async function callback(origin:string, destination: string) {

    console.log("Looking for route between {searchOriginQuery} and {searchDestinationQuery}");

    if (origin === '') {
      setRouteNotFound('Something went wrong.\nNo origin location was set.')
      return
    }

    if (destination === '') {
      setRouteNotFound('Something went wrong.\nNo destination location was set.')
      return
    }

    const directionsService = new google.maps.DirectionsService();
    try {
      let results = await directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      })

      if (results != null && results.routes != null && results.routes.length > 0) {
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
        setRouteNotFound('')
      }
    } catch(e) {
      setRouteNotFound('Something went wrong. Route was not found.')
    }

  }, [])


  const onPress = () => {
    console.log("Looking for directions...")
      setRouteNotFound('')
      calculateRoute(searchOriginQuery, searchDestinationQuery);
      setSearchOriginQuery('');
      setSearchDestinationQuery('');
  }

  return isLoaded ? (
    <View style={styles.container}>

      <Text style={styles.welcomeText}>Origin</Text>
      <Autocomplete>
        <TextInput
          left={<TextInput.Icon icon="magnify" />}
          label="Enter your route" value={searchOriginQuery}
          style={styles.inputText}
          onChangeText={(text) => setSearchOriginQuery(text)}/>
      </Autocomplete>

      <Text style={styles.welcomeText}>Destination</Text>
      <Autocomplete>
        <TextInput
          left={<TextInput.Icon icon="magnify" />}
          label="Enter your route"
          value={searchDestinationQuery}
          style={styles.inputText}
          onChangeText={(text) => setSearchDestinationQuery(text)}/>
      </Autocomplete>

      <GoogleMap
        mapContainerStyle={styles.map}
        center={center}
        onLoad={onLoad}
      >
        {directionsResponse != null && (
            <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>

      <Text style={styles.descriptionRoute}>Duration: {duration}</Text>
      <Text style={styles.descriptionRoute}>Distance: {distance}</Text>
      <Text style={styles.errorMessage}>{routeNotFound}</Text>

      <Button mode="contained" style={styles.button} onPress={onPress}>Search</Button>

    </View>
  ) : <></>
};

export default DireccionBox;
