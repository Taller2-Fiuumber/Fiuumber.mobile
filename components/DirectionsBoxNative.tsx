import React, { ReactElement} from "react";
import { Pallete } from "../constants/Pallete";
import { Button, Portal , Provider} from 'react-native-paper';
import { StyleSheet, View, } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesInput } from "./GooglePlacesInput";
import MapViewDirections from 'react-native-maps-directions';
import { FirebaseService } from "../services/FirebaseService";
import { ref, onChildAdded, query, limitToFirst } from "firebase/database";
import { AuthService } from "../services/AuthService";
import { User } from "../models/user";
import FindTripModal from "../modals/FindTripModal";
import RequestedTripModal from "../modals/RequestedTripModal";

const styles = StyleSheet.create({
  mainContainer: {
    position:"relative",
    height: "100%",
    backgroundColor: Pallete.greenBackground,
    padding: "5%",
  },

  containerAutocomplete: {
    position:"relative",
    backgroundColor: Pallete.greenBackground,
    paddingBottom: "10%",
    minWidth: 50,
  },

  containerMap: {
    position:"relative",
    height: "80%",
    backgroundColor: Pallete.greenBackground,
  },

  map: {
    position:"relative",
    height: "80%",
    paddingTop: "5%",
  },
  errorMessage: {
    color: "#FF0000",
    fontSize: 12,
    textAlign: "center"
  },
  inputText: {
    position: 'relative',
    color: Pallete.darkBackground,
    fontSize: 12,
    width: '100%',
    paddingTop: "5%",
    paddingBottom: "5%",
  },

  button: {
    position:"relative",
    color: Pallete.darkBackground,
    marginLeft: "5%",
    marginRight: "5%",
  },

  autocomplete: {
    flex: 1,
    width: '100%',
    paddingTop: "10%",
    paddingBottom: "5%",
  },
  containerInputs: {
    flex: 1,
  }

});

export const DirectionsBoxNative = (): ReactElement => {

  const user: User | undefined = AuthService.getCurrentUserToken()?.user;

  const [origin, setOrigin] =  React.useState<any>(null);
  const [destination, setDestination] =  React.useState<any>(null);

  const [findTripvisible, setFindTripVisible] = React.useState(false);
  const [requestedTripvisible, setRequestedTripVisible] = React.useState(false);
  const [requestedTripId, setRequestedTripId] = React.useState("");
  const [rejectedTrips, setRejectedTrips] = React.useState<string[]>([]);

  const showFindTripModal = () => setFindTripVisible(true);
  const hideFindTripModal = () => setFindTripVisible(false);

  const showRequestedTripModal = (tripId: string) => {
    setRequestedTripVisible(true);
    setRequestedTripId(tripId);
  }

  const hideRequestedTripModal = () => {
    rejectedTrips.push(requestedTripId);
    setRejectedTrips(rejectedTrips);
    setRequestedTripId("");
    setRequestedTripVisible(false);
  }

  const watchForNewTrips = () => {
      const reference = ref(FirebaseService.db, `/trips`);
      onChildAdded(query(reference), snapshot => {
        const tripStatus: {tripId: string, status: string} | null = snapshot.val();
        if (tripStatus && !requestedTripvisible && !rejectedTrips.find(t => t == tripStatus?.tripId)) {
          showRequestedTripModal(tripStatus.tripId);
        }
      });
  };

  React.useEffect(() => {
    if (user?.profile === "DRIVER") {
      watchForNewTrips();
    }
  }, []);

  return (
  <>
  <Provider>
    <Portal>
      {origin && destination && findTripvisible ? <FindTripModal visible={findTripvisible} onDismiss={hideFindTripModal} contentContainerStyle={{}} origin={origin} destination={destination}></FindTripModal> : <></>}      
      {requestedTripId !== "" ? <RequestedTripModal visible={requestedTripvisible} onDismiss={hideRequestedTripModal} contentContainerStyle={{}} tripId={requestedTripId}></RequestedTripModal> : <></>}
    </Portal>
    <View style={styles.mainContainer}>
      {
        user?.profile === "PASSENGER"  ? (<>
         <View style={styles.containerAutocomplete}>
          <GooglePlacesInput placeholder="Origin" containerStyles={styles.autocomplete} onPress={(data, details = null) => {
            const position = { latitude: details?.geometry.location.lat || 0, longitude: details?.geometry.location.lng || 0};
            setOrigin(position);
          }}></GooglePlacesInput>

          <GooglePlacesInput placeholder="Destination" containerStyles={styles.autocomplete} onPress={(data, details = null) => {
            const position = { latitude: details?.geometry.location.lat || 0, longitude: details?.geometry.location.lng || 0};
            setDestination(position);
          }}></GooglePlacesInput>
        </View>
        </>) : <></>
      }

      <View style={styles.containerMap}>
        <View style={styles.map}>
          <MapView
              style={{width: '100%', height: "80%"}}
              initialRegion={{
                latitude: -34.6175841,
                longitude: -58.3682286,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {destination ? <Marker coordinate={destination} /> : <></>}
              {origin ? <Marker coordinate={origin} /> : <></>}
              {origin && destination ?
                <MapViewDirections
                  origin={origin}
                  destination={destination}
                  apikey="AIzaSyBfs3U9Y_wu6bVrUKC737-Dj_JkWWHGU1I"
                  strokeWidth={5}
                  strokeColor="hotpink"
                />
                : <></>
              }
          </MapView>
        </View>
        
        { user?.profile === "PASSENGER" ?
            <Button mode="contained" style={styles.button} onPress={showFindTripModal}>Get your Fiuumber!</Button> : <></>
        }
      </View>
    </View>
  </Provider>
    
  </>
  );
};
