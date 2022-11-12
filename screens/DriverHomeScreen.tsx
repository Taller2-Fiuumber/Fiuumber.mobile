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

interface DriverHomeScreenProps { }

export const DriverHomeScreen: FC<DriverHomeScreenProps> = (): ReactElement => {

    const [mapRef, setMapRef] = useState<any | null>(null);

    const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);

    const footerSize: number = 200;
    const { width, height } = Dimensions.get('window');
    const mapHeight: number = height - footerSize;

    const [requestedTripId, setRequestedTripId] = React.useState("");
    const [rejectedTrips, setRejectedTrips] = React.useState<string[]>([]);
    const [requestedTripvisible, setRequestedTripVisible] = React.useState(false);
    const [pickupLocation, setPickupLocation] = React.useState<any>(null);

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
        setCurrentTrip(trip);
    };

    const watchForNewTrips = () => {
        const reference = ref(FirebaseService.db, `/trips`);
        onChildAdded(query(reference), snapshot => {
            const tripStatus: { tripId: string, status: string } | null = snapshot.val();
            if (tripStatus && !requestedTripvisible && !rejectedTrips.find(t => t == tripStatus?.tripId)) {
                showRequestedTripModal(tripStatus.tripId);
            }
        });
    };

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
                        <FiuumberMap markers={null} onMapRef={setMapRef} origin={null} destination={null}></FiuumberMap>
                    </View>
                    <View style={{ width: '100%', height: footerSize, padding: 10, backgroundColor: Pallete.lightColor }}>
                        {/* {
                            currentTrip ?
                                <>
                                    <PaymentInfoCard ammount={currentTrip.finalPrice}></PaymentInfoCard>
                                    <Button mode="contained" onPress={onClickIArrived}>I Arrived!</Button>
                                </> :
                                <View>
                                    <Text>Explore the area to get passengers</Text>
                                </View>
                        } */}
                        <PaymentInfoCard ammount={500}></PaymentInfoCard>
                        <Button mode="contained" onPress={onClickIArrived}>I Arrived!</Button>

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
});


