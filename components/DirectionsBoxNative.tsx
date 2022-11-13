import React, { ReactElement } from "react";
import { Pallete } from "../constants/Pallete";
import { Button, Portal, Provider, Text } from 'react-native-paper';
import { StyleSheet, View, } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesInput } from "./GooglePlacesInput";
import MapViewDirections from 'react-native-maps-directions';
import { FirebaseService } from "../services/FirebaseService";
import { ref, onChildAdded, query } from "firebase/database";
import { AuthService } from "../services/AuthService";
import { User } from "../models/user";
import FindTripModal from "../modals/FindTripModal";
import RequestedTripModal from "../modals/RequestedTripModal";
import { TripsService } from "../services/TripsService";
import { Trip } from "../models/trip";
import * as Location from 'expo-location';
import { TripStatus } from "../enums/trip-status";

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
    height: "55%",
    zIndex: 10,
    minHeight: 300
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
  const userLocationIcon = require("../assets/icons/map-pin.png");

  const [origin, setOrigin] = React.useState<any>(null);
  const [destination, setDestination] = React.useState<any>(null);
  const [originAddress, setOriginAddress] = React.useState<string | null>(null);
  const [destinationAddress, setDestinationAddress] = React.useState<string | null>(null);
  const [fare, setFare] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [currentTrip, setCurrentTrip] = React.useState<Trip | null>(null);

  const [findTripvisible, setFindTripVisible] = React.useState(false);

  const [pickupLocation, setPickupLocation] = React.useState<any>(null);

  const [realtimeLocation, setRealtimeLocation] = React.useState<any>(null);

  const showFindTripModal = () => setFindTripVisible(true);
  const hideFindTripModal = () => setFindTripVisible(false);

  const onAcceptedTrip = (trip: Trip) => {
    hideFindTripModal();
    setCurrentTrip(trip);
    watchForTripChanges(trip._id);
  };

  const onClickGetFiuumber = () => showFindTripModal();

  const refreshFare = async () => {
    if (!origin || !destination) return;

    try {
      setLoading(true);
      const calculatedFare = await TripsService.getFare(origin.latitude, destination.latitude, origin.longitude, destination.longitude);
      setFare(calculatedFare);
    }
    catch (error) {
      console.error(error);
      // TODO: informar al usuario que hubo un error al calcular la tarifa
    }
    finally {
      setLoading(false);
    }

  };

  const watchForTripChanges = (tripId: string) => {
    const reference = ref(FirebaseService.db, `/trips/${tripId}`);
    onChildAdded(query(reference), snapshot => {
      const tripStatus: { tripId: string, status: string } | null = snapshot.val();
      if (tripStatus) {
        console.log(tripStatus);
      }
    });
  };

  React.useEffect(() => {
    refreshFare();
  }, [origin, destination]);

  React.useEffect(() => {
    (async () => {

      const interval = setInterval(async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          // setErrorMsg('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setRealtimeLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
      }, 2000);

      return () => clearInterval(interval);
    })();
  }, []);

  return (
    <>
      <Provider>
        <Portal>
          {origin && destination && findTripvisible && originAddress && destinationAddress ? <FindTripModal onAcceptedTrip={onAcceptedTrip} visible={findTripvisible} onDismiss={hideFindTripModal} contentContainerStyle={{}} origin={origin} destination={destination} originAddress={originAddress} destinationAddress={destinationAddress}></FindTripModal> : <></>}
        </Portal>
        <View style={styles.mainContainer}>
          {
            <View style={styles.containerAutocomplete}>
              <GooglePlacesInput placeholder="Origin" containerStyles={styles.autocomplete} listView={styles.listViewOrigin} onPress={(_data, details = null) => {
                if (!details) setOrigin(null);
                const position = { latitude: details?.geometry.location.lat || 0, longitude: details?.geometry.location.lng || 0 };
                setOriginAddress(_data.description);
                setOrigin(position);
              }}></GooglePlacesInput>

              <GooglePlacesInput placeholder="Destination" containerStyles={styles.autocomplete} listView={styles.listViewDestination} onPress={(_data, details = null) => {
                if (!details) setDestination(null);
                const position = { latitude: details?.geometry.location.lat || 0, longitude: details?.geometry.location.lng || 0 };
                setDestinationAddress(_data.description);
                setDestination(position);
              }}></GooglePlacesInput>
            </View>
          }

          <View style={styles.containerMap}>
            <View style={styles.map}>
              <MapView
                ref={(ref) => { setMapRef(ref) }}
                style={{ width: '100%', height: "100%" }}
                initialRegion={{
                  latitude: -34.6175841,
                  longitude: -58.3682286,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                onLayout={() => { }}
              >
                {destination ? <Marker coordinate={destination} identifier={'mkDestination'} /> : <></>}
                {origin ? <Marker coordinate={origin} identifier={'mkOrigin'} /> : <></>}
                {pickupLocation ? <Marker coordinate={pickupLocation} identifier={'mkPickup'} /> : <></>}
                {realtimeLocation ? <Marker coordinate={realtimeLocation} identifier={'mkRealtimeLocation'} pinColor={'turquoise'} /*image={userLocationIcon}*/ /> : <></>}
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
                <View style={{ ...styles.fareContainer, ...styles.fareSelected }}>
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
              : <></>}

            <Button mode="contained" disabled={loading || !origin || !destination} style={styles.button} onPress={onClickGetFiuumber}>Get your Fiuumber!</Button>
          </View>
        </View>
      </Provider>

    </>
  );
};
