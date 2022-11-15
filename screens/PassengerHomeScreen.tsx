import React, { FC, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import BottomSheet from '@gorhom/bottom-sheet';
import { StyleSheet, View, Image } from "react-native";
import { Button, Portal, Provider, Text, Card, Title, Paragraph, Divider, IconButton } from 'react-native-paper';
import InfoCard from "../components/InfoCard";
import { Trip } from "../models/trip";
import FiuumberMap from "../components/FiuumberMap";
import { LatLng } from "react-native-maps";
import { GooglePlacesInput } from "../components/GooglePlacesInput";
import { Pallete } from "../constants/Pallete";
import { TripsService } from "../services/TripsService";
import FindTripModal from "../modals/FindTripModal";
import { ref, onChildAdded, query, onChildChanged } from "firebase/database";
import { FirebaseService } from "../services/FirebaseService";
import { Driver } from "../models/driver";
import { AuthService } from "../services/AuthService";
import { useRealtimeLocation } from "../hooks/useRealtimeLocation";

interface PassengerHomeScreenProps { }

export const PassengerHomeScreen: FC<PassengerHomeScreenProps> = (): ReactElement => {

    const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);

    const myLocation: LatLng | null = useRealtimeLocation(3000);

    const [origin, setOrigin] = React.useState<LatLng | null>(null);
    const [destination, setDestination] = React.useState<LatLng | null>(null);
    const [originAddress, setOriginAddress] = React.useState<string | null>(null);
    const [destinationAddress, setDestinationAddress] = React.useState<string | null>(null);

    const [mapRef, setMapRef] = useState<any | null>(null);
    const [driverRealtimeLocation, setDriverRealtimeLocation] = React.useState<any>(null);
    const [fare, setFare] = React.useState<number>(0);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [viewState, setViewState] = React.useState<"DIRECTIONS" | "FARE" | "DRIVER_ASSIGNED">("DIRECTIONS");

    const [currentDriver, setCurrentDriver] = React.useState<Driver | null>(null);

    const [findTripvisible, setFindTripVisible] = React.useState(false);

    const showFindTripModal = () => setFindTripVisible(true);
    const hideFindTripModal = () => setFindTripVisible(false);

    const onClickContinue = () => {
        bottomSheetRef.current?.snapToIndex(0);
        setViewState("FARE");
        refreshFare();
    }

    const onClickGetFiuumber = () => showFindTripModal();

    const onAcceptedTrip = async (trip: Trip) => {
        hideFindTripModal();
        setCurrentTrip(trip);
        watchForDriverLocationChanges(trip._id);
        setViewState("DRIVER_ASSIGNED");

        const driver: Driver | null = await AuthService.getDriver(Number(trip.driverId));
        setCurrentDriver(driver);
    };

    const watchForDriverLocationChanges = (tripId: string) => {
        const reference = ref(FirebaseService.db, `/trips/${tripId}/driver`);
        onChildAdded(query(reference), snapshot => {
            console.log("STATUS", snapshot.val());
            const driverLocation: LatLng = snapshot.val();
            setDriverRealtimeLocation(driverLocation);
            // const tripStatus: { tripId: string, status: string, driver: { location: LatLng } } | null = snapshot.val();

            // if (tripStatus) {
            //     console.log(tripStatus);
            // }
        });
    };

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    const setMinHeightBottomSheet = () => {
        if (viewState == "DRIVER_ASSIGNED") return '40%';
        if (origin && destination) return '30%';
        if (!currentTrip) return '20%';
        return '20%';
    }

    // variables
    const snapPoints = useMemo(() => [setMinHeightBottomSheet(), '100%'], [currentTrip, origin, destination, viewState]);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
    }, []);

    const focusTextField = () => {
        bottomSheetRef.current?.snapToIndex(1);
    }

    const onClickChangeDirections = () => {
        setOrigin(null);
        setDestination(null);
        setViewState("DIRECTIONS");
    }

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

    useEffect(() => {
        if (!myLocation || !currentTrip) return;

        console.log("MY LOCATION", myLocation);

    }, [myLocation, currentTrip])

    return (
        <>
            <Provider>
                <Portal>
                    {origin && destination && findTripvisible && originAddress && destinationAddress ? <FindTripModal fare={fare} onAcceptedTrip={onAcceptedTrip} visible={findTripvisible} onDismiss={hideFindTripModal} contentContainerStyle={{}} origin={origin} destination={destination} originAddress={originAddress} destinationAddress={destinationAddress}></FindTripModal> : <></>}
                </Portal>
                <FiuumberMap passengerPosition={myLocation} onMapRef={setMapRef} origin={origin} destination={destination} driverLocation={driverRealtimeLocation}></FiuumberMap>
                <BottomSheet
                    ref={bottomSheetRef}
                    index={0}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    backgroundStyle={{ backgroundColor: (viewState == "DRIVER_ASSIGNED") ? Pallete.lightColor : Pallete.whiteColor }}
                >
                    {
                        viewState == "DIRECTIONS" &&
                        (<>
                            <View style={styles.contentContainer}>
                                <InfoCard icon="account-search-outline" title="Welcome back to Fiuumber" subtitle="Tell us where we are going"></InfoCard>
                                <View style={styles.containerAutocomplete}>
                                    <GooglePlacesInput placeholder="Origin" containerStyles={styles.autocomplete} listView={styles.listViewOrigin} focus={focusTextField} onPress={(_data, details = null) => {
                                        if (!details) setOrigin(null);
                                        const position = { latitude: details?.geometry.location.lat || 0, longitude: details?.geometry.location.lng || 0 };
                                        setOriginAddress(_data.description);
                                        setOrigin(position);
                                    }}></GooglePlacesInput>

                                    <GooglePlacesInput placeholder="Destination" containerStyles={styles.autocomplete} listView={styles.listViewDestination} focus={focusTextField} onPress={(_data, details = null) => {
                                        if (!details) setDestination(null);
                                        const position = { latitude: details?.geometry.location.lat || 0, longitude: details?.geometry.location.lng || 0 };
                                        setDestinationAddress(_data.description);
                                        setDestination(position);
                                    }}></GooglePlacesInput>
                                </View>
                                <View>
                                    <Text>No favorites added</Text>
                                </View>
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button mode="contained" disabled={!origin || !destination} onPress={onClickContinue}>Continue</Button>
                            </View>
                        </>)
                    }
                    {
                        viewState == "FARE" && (<>
                            {loading && (<Text>Loading fare...</Text>)}
                            {fare > 0 && !loading ?
                                <>
                                    <View style={styles.contentContainer}>
                                        <View style={{ ...styles.fareContainer, ...styles.fareSelected }}>
                                            <View>
                                                <Text variant="labelLarge" style={{ color: Pallete.darkColor }}>Fiuumber classic</Text>
                                                <Text variant="labelSmall" style={{ color: Pallete.darkColor }}>15 min</Text>
                                            </View>
                                            <Text variant="titleMedium" style={styles.farePrice}>ETH {fare}</Text>
                                        </View>
                                        <View style={styles.fareContainer}>
                                            <View>
                                                <Text variant="labelLarge">VIP Fiuumber</Text>
                                            </View>
                                            <Text variant="labelSmall" style={styles.farePrice}>Coming soon</Text>
                                        </View>
                                        <Button mode="contained" style={{ marginTop: 15 }} onPress={onClickGetFiuumber}>Get your Fiuumber!</Button>
                                        <Button mode="outlined" style={{ marginTop: 15 }} onPress={onClickChangeDirections}>Change directions</Button>
                                    </View>
                                </>
                                : <></>}
                        </>)
                    }
                    {
                        viewState == "DRIVER_ASSIGNED" && currentDriver && (
                            <>
                                <View style={styles.contentContainer}>
                                    <Card style={styles.cardVehicleInfo}>
                                        <Card.Content>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ flex: 1 }}>
                                                    <Title style={styles.cardTitle}>{currentDriver.driverVehicle.domain}</Title>
                                                    <Paragraph style={{ color: Pallete.contentColor }}>{currentDriver.driverVehicle.vehicle.brand} {currentDriver.driverVehicle.vehicle.model}</Paragraph>
                                                </View>
                                                <View>
                                                    <Image
                                                        style={styles.tinyLogo}
                                                        source={{
                                                            uri: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_537/v1568070443/assets/82/6bf372-6016-492d-b20d-d81878a14752/original/Black.png',
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                            <Divider style={styles.divider} />
                                            <View style={{ flexDirection: 'row', }}>
                                                <View style={{ flex: 1 }}>
                                                    <InfoCard icon="account" title={currentDriver.user.firstName} subtitle={"★ 4.5 +420 trips"}></InfoCard>
                                                </View>
                                                <View>
                                                    <IconButton
                                                        icon="chat"
                                                        style={{ backgroundColor: Pallete.lightColor }}
                                                        iconColor={Pallete.darkColor}
                                                        size={20}
                                                        mode='contained'
                                                        onPress={() => console.log('Pressed')}
                                                    />
                                                </View>
                                            </View>
                                        </Card.Content>
                                    </Card>
                                    <View style={{ marginTop: 15 }}>
                                        <Text style={{ color: Pallete.darkColor, textAlign: 'center' }}>{currentTrip?.fromAddress}</Text>
                                        <View style={{ alignItems: 'center' }}>
                                            <View style={{ width: 1, backgroundColor: 'black', height: 15 }}></View>
                                        </View>
                                        <Text style={{ color: Pallete.darkColor, width: '100%', overflow: 'hidden', textAlign: 'center' }}>{currentTrip?.toAddress}</Text>
                                    </View>
                                </View>
                            </>
                        )
                    }
                </BottomSheet>
            </Provider>
        </>
    )
};

export default PassengerHomeScreen;

const styles = StyleSheet.create({
    container: {
    },
    contentContainer: {
        padding: 10,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        padding: 5,
    },
    containerAutocomplete: {
        backgroundColor: Pallete.whiteColor,
        height: 110,
        zIndex: 1,
        marginTop: 15
    },
    containerMap: {
        backgroundColor: Pallete.whiteColor,
    },
    map: {
        height: "55%",
        zIndex: 10,
        minHeight: 300
    },
    autocomplete: {
        borderWidth: 1,
        borderColor: Pallete.primaryColor,
        marginBottom: 5,
        borderRadius: 5
    },
    listViewOrigin: {
        position: 'absolute',
        zIndex: 5,
        top: 110
    },
    listViewDestination: {
        position: 'absolute',
        zIndex: 99,
        top: 60
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
        color: Pallete.darkColor
    },
    fareSelected: {
        borderWidth: 3,
        borderColor: Pallete.coral
    },
    cardVehicleInfo: {
        backgroundColor: Pallete.whiteColor,
        borderRadius: 5
    },
    divider: { marginVertical: 15, backgroundColor: Pallete.lightColor },
    cardTitle: { color: Pallete.darkColor, fontWeight: 'bold' },
    tinyLogo: {
        width: 85,
        height: 50,
    },
});
