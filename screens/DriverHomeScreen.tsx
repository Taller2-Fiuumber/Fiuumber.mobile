import React, { FC, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Pallete } from "../constants/Pallete";
import { Dimensions, StyleSheet } from "react-native";
import { View } from "../components/Themed";
import FiuumberMap from "../components/FiuumberMap";
import { Button, Divider, Portal, Provider } from "react-native-paper";
import { ref, onChildAdded, query } from "firebase/database";
import { FirebaseService } from "../services/FirebaseService";
import RequestedTripModal from "../modals/RequestedTripModal";
import { Trip } from "../models/trip";
import PaymentInfoCard from "../components/PaymentInfoCard";
import AddressInfoCard from "../components/AddressInfoCard";
import InfoCard from "../components/InfoCard";
import { TripStatus } from "../enums/trip-status";
import { LatLng } from "react-native-maps";
import BottomSheet from '@gorhom/bottom-sheet';
import { TripsService } from "../services/TripsService";
import { useRealtimeLocation } from "../hooks/useRealtimeLocation";
import { useStreamLocation } from "../hooks/useStreamLocation";
import { Unsubscribe } from "@firebase/util";

interface DriverHomeScreenProps { }

export const DriverHomeScreen: FC<DriverHomeScreenProps> = (): ReactElement => {

    let unsubscribeWatchForNewTrips: Unsubscribe | null = null;

    const [_mapRef, setMapRef] = useState<any | null>(null);

    const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);

    const { width, height } = Dimensions.get('window');

    const [requestedTripId, setRequestedTripId] = React.useState("");
    const [rejectedTrips, setRejectedTrips] = React.useState<string[]>([]);
    const [requestedTripvisible, setRequestedTripVisible] = React.useState(false);

    const [nextAddress, setNextAddress] = React.useState<string | null>(null);

    const [origin, setOrigin] = React.useState<LatLng | null>(null);
    const [destination, setDestination] = React.useState<LatLng | null>(null);

    const [loading, setLoading] = React.useState<boolean>(false);

    const myLocation = useRealtimeLocation(5000);
    useStreamLocation(currentTrip, myLocation, "DRIVER");

    const onClickIArrived = async () => changeTripStatus(TripStatus.DriverArrived);
    const onClickStartTrip = async () => {
        await changeTripStatus(TripStatus.InProgress);
        if (currentTrip) {
            setDestination({ latitude: currentTrip?.toLatitude, longitude: currentTrip?.toLongitude });
            setNextAddress(currentTrip.toAddress);
            const positionDestination = { latitude: currentTrip.fromLatitude, longitude: currentTrip.fromLongitude };
            setOrigin(positionDestination); // TODO: cambiar por myLocation para que las indicaciones funcionen ok en la vida real
        }
    }
    const onClickFinishTrip = async () => {
        await changeTripStatus(TripStatus.Terminated);
        cleanupTrip();
    }

    const onClickCancelTrip = async () => {
        await changeTripStatus(TripStatus.Canceled);
        cleanupTrip();
    }

    const cleanupTrip = () => {
        setCurrentTrip(null);
        setOrigin(null);
        setDestination(null);
        setNextAddress(null);
        unsubscribeWatchForNewTrips = watchForNewTrips();
    }

    const changeTripStatus = async (status: TripStatus) => {
        if (!currentTrip) return;
        setLoading(true);
        const tripUpdated: Trip | null = await TripsService.setTripStatus(currentTrip._id, status);
        setCurrentTrip(tripUpdated);
        setLoading(false);
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

    const onTripAccepted = async (trip: Trip) => {
        setRequestedTripVisible(false);
        const positionOrigin = { latitude: trip.fromLatitude, longitude: trip.fromLongitude };
        setOrigin(myLocation);
        setDestination(positionOrigin);
        setCurrentTrip(trip);
        setNextAddress(trip.fromAddress);
        if (unsubscribeWatchForNewTrips) unsubscribeWatchForNewTrips(); // Dejo de escuchar por posibles nuevos viajes
        if (myLocation) await FirebaseService.updateDriverLocation(trip._id, myLocation);
    };

    const watchForNewTrips = () => {
        const reference = ref(FirebaseService.db, `/trips/${TripStatus.Requested}`);
        return onChildAdded(query(reference), snapshot => {
            const tripStatus: { tripId: string, status: string } | null = snapshot.val();
            if (tripStatus && !requestedTripvisible && !rejectedTrips.find(t => t == tripStatus?.tripId)) {
                showRequestedTripModal(tripStatus.tripId);
            }
        });
    };

    useEffect(() => {
        unsubscribeWatchForNewTrips = watchForNewTrips();
    }, []);


    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    const setMinHeightBottomSheet = () => {
        if (!currentTrip) return '12%';
        return '20%';
    }

    // variables
    const snapPoints = useMemo(() => [setMinHeightBottomSheet(), '100%'], [currentTrip]);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
    }, []);

    return (
        <>
            <Provider>
                <Portal>
                    {requestedTripId !== "" ? <RequestedTripModal visible={requestedTripvisible} onDismiss={hideRequestedTripModal} onAccepted={onTripAccepted} contentContainerStyle={{}} tripId={requestedTripId}></RequestedTripModal> : <></>}
                </Portal>
                <View>
                    <View>
                        {nextAddress && (
                            <View style={{ ...styles.directionContainer, width: (width - 20) }}>
                                <AddressInfoCard address={nextAddress}></AddressInfoCard>
                            </View>)}
                        <FiuumberMap passengerPosition={null} onMapRef={setMapRef} origin={origin} destination={destination} driverLocation={myLocation}></FiuumberMap>
                    </View>
                    <BottomSheet
                        ref={bottomSheetRef}
                        index={0}
                        snapPoints={snapPoints}
                        onChange={handleSheetChanges}
                    >
                        <View style={styles.contentContainer}>
                            {
                                currentTrip ?
                                    <>
                                        <PaymentInfoCard ammount={currentTrip.finalPrice}></PaymentInfoCard>
                                        {currentTrip.status == TripStatus.Requested && (<Button mode="contained" disabled={loading} loading={loading} style={{ marginTop: 10 }} onPress={onClickIArrived}>I Arrived!</Button>)}
                                        {currentTrip.status == TripStatus.DriverArrived && (<Button mode="contained" disabled={loading} loading={loading} buttonColor={Pallete.primaryColor} textColor={Pallete.whiteColor} style={{ marginTop: 10 }} onPress={onClickStartTrip}>Start trip</Button>)}
                                        {currentTrip.status == TripStatus.InProgress && (<Button mode="contained" disabled={loading} loading={loading} buttonColor={Pallete.greenBackground} textColor={Pallete.whiteColor} style={{ marginTop: 10 }} onPress={onClickFinishTrip}>Finish trip</Button>)}
                                        <Divider style={{ marginTop: 10, marginBottom: 10, backgroundColor: Pallete.primaryColor }}></Divider>
                                        <Button loading={loading} disabled={loading} mode="outlined" buttonColor='red' textColor="white" style={{ marginTop: 10 }} onPress={onClickCancelTrip}>Cancel trip</Button>
                                    </> :
                                    <>
                                        <InfoCard icon="account-search-outline" title="Looking por passengers?" subtitle="Explore the area to increase your chances"></InfoCard>
                                    </>
                            }
                        </View>
                    </BottomSheet>
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
    footerContainer: { width: '100%', padding: 10, backgroundColor: Pallete.whiteColor },
    contentContainer: {
        flex: 1,
        backgroundColor: Pallete.whiteColor,
        padding: 10,
        justifyContent: 'flex-start'
    }
});


