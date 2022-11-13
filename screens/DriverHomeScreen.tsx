import React, { FC, ReactElement, useEffect, useState } from "react";

import { Pallete } from "../constants/Pallete";
import { Dimensions, StyleSheet } from "react-native";
import { View } from "../components/Themed";
import FiuumberMap from "../components/FiuumberMap";
import { Button, Portal, Provider, Text } from "react-native-paper";
import { ref, onChildAdded, query } from "firebase/database";
import { FirebaseService } from "../services/FirebaseService";
import RequestedTripModal from "../modals/RequestedTripModal";
import { Trip } from "../models/trip";
import PaymentInfoCard from "../components/PaymentInfoCard";
import AddressInfoCard from "../components/AddressInfoCard";
import InfoCard from "../components/InfoCard";
import { TripStatus } from "../enums/trip-status";
import { Marker } from "../models/marker";
import * as Location from 'expo-location';
import { LatLng } from "react-native-maps";

interface DriverHomeScreenProps { }

export const DriverHomeScreen: FC<DriverHomeScreenProps> = (): ReactElement => {

    const [mapRef, setMapRef] = useState<any | null>(null);

    const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);

    const footerSize: number = 170;
    const { width, height } = Dimensions.get('window');
    const mapHeight: number = height - footerSize;

    const [requestedTripId, setRequestedTripId] = React.useState("");
    const [rejectedTrips, setRejectedTrips] = React.useState<string[]>([]);
    const [requestedTripvisible, setRequestedTripVisible] = React.useState(false);
    const [pickupLocation, setPickupLocation] = React.useState<any>(null);

    const [markers, setMarkers] = React.useState<Marker[] | null>(null);

    const [realtimeLocation, setRealtimeLocation] = React.useState<any>(null);

    const onClickIArrived = () => {

    }

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

    const onTripAccepted = (trip: Trip) => {
        setRequestedTripVisible(false);
        const position = { latitude: trip.fromLatitude, longitude: trip.fromLongitude };
        setPickupLocation(position);
        const marker: Marker = { coordinate: position, identifier: "mkPickupPoint" };
        setMarkers([marker]);
        setCurrentTrip(trip);
    };

    const watchForNewTrips = () => {
        const reference = ref(FirebaseService.db, `/trips/${TripStatus.Requested}`);
        onChildAdded(query(reference), snapshot => {
            const tripStatus: { tripId: string, status: string } | null = snapshot.val();
            if (tripStatus && !requestedTripvisible && !rejectedTrips.find(t => t == tripStatus?.tripId)) {
                showRequestedTripModal(tripStatus.tripId);
            }
        });
    };

    React.useEffect(() => {
        (async () => {

            const interval = setInterval(async () => {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    // setErrorMsg('Permission to access location was denied');
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                const rtLocation: LatLng = { latitude: location.coords.latitude, longitude: location.coords.longitude };
                if (currentTrip && rtLocation != realtimeLocation) {
                    FirebaseService.updateDriverLocation(currentTrip._id, realtimeLocation);
                }
                setRealtimeLocation(rtLocation);

            }, 2000);

            return () => clearInterval(interval);
        })();
    }, []);

    useEffect(() => {
        watchForNewTrips();
    }, []);

    return (
        <>
            <Provider>
                <Portal>
                    {requestedTripId !== "" ? <RequestedTripModal visible={requestedTripvisible} onDismiss={hideRequestedTripModal} onAccepted={onTripAccepted} contentContainerStyle={{}} tripId={requestedTripId}></RequestedTripModal> : <></>}
                </Portal>
                <View>
                    <View style={{ height: mapHeight, width: width }}>
                        {currentTrip && (
                            <View style={{ ...styles.directionContainer, width: (width - 20) }}>
                                <AddressInfoCard address={currentTrip.fromAddress}></AddressInfoCard>
                            </View>)}
                        <FiuumberMap markers={markers} onMapRef={setMapRef} origin={null} destination={null}></FiuumberMap>
                    </View>
                    <View style={{ width: '100%', height: footerSize, padding: 10, backgroundColor: Pallete.whiteColor }}>
                        {
                            currentTrip ?
                                <>
                                    <PaymentInfoCard ammount={currentTrip.finalPrice}></PaymentInfoCard>
                                    {/* <Button style={styles.cancelButton} textColor='red' mode='outlined'>CANCEL</Button> */}
                                    <Button mode="contained" style={{ marginTop: 10 }} onPress={onClickIArrived}>I Arrived!</Button>
                                </> :
                                <>
                                    <View style={{ marginTop: 25 }}>
                                        <InfoCard title="Looking por passengers?" subtitle="Explore the area to increase your chances"></InfoCard>
                                    </View>
                                </>
                        }

                    </View>
                </View>
            </Provider>
        </>
    )
};

export default DriverHomeScreen;

const styles = StyleSheet.create({
    container: {
    },
    directionContainer: { margin: 10, position: 'absolute', zIndex: 1, backgroundColor: 'transparent' },
    cancelButton: {
        marginTop: 20,
        borderColor: 'red'
    },
});

