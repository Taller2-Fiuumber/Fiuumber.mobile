import React, { ReactElement} from "react";
import { Pallete } from "../constants/Pallete";
import { Button, Portal , Provider, Text } from 'react-native-paper';
import { StyleSheet, View, } from "react-native";
import MapView, { LatLng, Marker } from 'react-native-maps';
import { GooglePlacesInput } from "./GooglePlacesInput";
import MapViewDirections from 'react-native-maps-directions';
import { FirebaseService } from "../services/FirebaseService";
import { ref, onChildAdded, query, limitToFirst } from "firebase/database";
import { AuthService } from "../services/AuthService";
import { User } from "../models/user";
import FindTripModal from "../modals/FindTripModal";
import RequestedTripModal from "../modals/RequestedTripModal";
import { TripsService } from "../services/TripsService";

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Pallete.greenBackground,
    padding: 10
  },
  containerAutocomplete: {
    backgroundColor: Pallete.greenBackground,
    height: 110,
    zIndex: 1
  },
  containerMap: {
    backgroundColor: Pallete.greenBackground,
  },
  map: {
    position:"relative",
    height: "55%",
    zIndex: 10
  },
  button: {
    color: Pallete.darkBackground,
    marginTop: 20
  },
  autocomplete: {
  },
  listViewOrigin: {
    position: 'absolute',
    zIndex: 5,
    top: 40
  },
  listViewDestination: {
    position: 'absolute',
    zIndex: 99,
    top: 40
  },
  fareContainer: {
    flexDirection: "row",
    marginTop: 5,
    backgroundColor: Pallete.lightColor,
    borderRadius: 5,
    padding: 10,
  },
  farePrice: {
    flex: 1,
    textAlign: 'right',
  },
  fareSelected: {
    borderWidth: 3,
    borderColor: Pallete.coral
  }
});

export const DirectionsBoxNative = (): ReactElement => {

  const user: User | undefined = AuthService.getCurrentUserToken()?.user;
  const [mapRef, setMapRef] = React.useState<MapView | null>(null);

  const [origin, setOrigin] =  React.useState<any>(null);
  const [destination, setDestination] =  React.useState<any>(null);
  const [fare, setFare] =  React.useState<number>(0);
  const [loading, setLoading] =  React.useState<boolean>(false);

  const [findTripvisible, setFindTripVisible] = React.useState(false);
  const [requestedTripvisible, setRequestedTripVisible] = React.useState(false);
  const [requestedTripId, setRequestedTripId] = React.useState("");
  const [rejectedTrips, setRejectedTrips] = React.useState<string[]>([]);


  const showFindTripModal = () => setFindTripVisible(true);
  const hideFindTripModal = () => setFindTripVisible(false);

  const onClickGetFiuumber = () => {
    showFindTripModal();
  };

  const refreshFare = async () => {
    if (!origin || !destination) return;
    try {
      setLoading(true);
      const calculatedFare = await TripsService.getFare(origin.latitude, destination.latitude, origin.longitude, destination.longitude);
      setFare(calculatedFare);
    }
    catch(error) {
      console.error(error);
      // TODO: informar al usuario que hubo un error al calcular la tarifa
    }
    finally {
      setLoading(false);
    }
    
  };

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

  React.useEffect(() => {
    refreshFare();
    // if (mapRef && origin && destination) {
    //   mapRef?.fitToCoordinates([origin, destination], { edgePadding: { top: 50, right: 10, bottom: 10, left: 10 }, animated: true })
    // }
  }, [origin, destination]);

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
          <GooglePlacesInput placeholder="Origin" containerStyles={styles.autocomplete} listView={styles.listViewOrigin} onPress={(_data, details = null) => {
            if (!details) setOrigin(null);
            const position = { latitude: details?.geometry.location.lat || 0, longitude: details?.geometry.location.lng || 0};
            setOrigin(position);
          }}></GooglePlacesInput>

          <GooglePlacesInput placeholder="Destination" containerStyles={styles.autocomplete} listView={styles.listViewDestination} onPress={(_data, details = null) => {
            if (!details) setDestination(null);
            const position = { latitude: details?.geometry.location.lat || 0, longitude: details?.geometry.location.lng || 0};
            setDestination(position);
          }}></GooglePlacesInput>
        </View>
        </>) : <></>
      }
      <View style={styles.containerMap}>
        <View style={styles.map}>
          <MapView
              ref={(ref) => { setMapRef(ref) }}
              style={{width: '100%', height: "100%"}}
              initialRegion={{
                latitude: -34.6175841,
                longitude: -58.3682286,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              onLayout={() => {}}
            >
              {destination ? <Marker coordinate={destination} identifier={'mkDestination'} /> : <></>}
              {origin ? <Marker coordinate={origin} identifier={'mkOrigin'} /> : <></>}
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
        {fare > 0 && !loading ?
          <>
            <View style={{...styles.fareContainer, ...styles.fareSelected}}>
              <View>
                <Text variant="labelLarge">Fiuumber classic</Text>
                <Text variant="labelSmall">15 min</Text>
              </View>
              <Text variant="titleMedium" style={styles.farePrice}>$ {fare}</Text>    
            </View>
            <View style={styles.fareContainer}>
              <View>
                <Text variant="labelLarge">VIP Fiuumber</Text>
              </View>
              <Text variant="labelSmall" style={styles.farePrice}>Comming soon</Text>    
            </View>
          </>
        : <></> }
        
        { user?.profile === "PASSENGER" ?
            <Button mode="contained" disabled={loading || !origin || !destination} style={styles.button} onPress={onClickGetFiuumber}>Get your Fiuumber!</Button> : <></>
        }
      </View>
    </View>
  </Provider>
    
  </>
  );
};
