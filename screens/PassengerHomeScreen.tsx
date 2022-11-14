import React, { FC, ReactElement, useCallback, useMemo, useRef, useState } from "react";
import BottomSheet from '@gorhom/bottom-sheet';
import { StyleSheet, View } from "react-native";
import { Button, Portal, Provider, Text } from 'react-native-paper';
import InfoCard from "../components/InfoCard";
import PaymentInfoCard from "../components/PaymentInfoCard";
import { Trip } from "../models/trip";
import FiuumberMap from "../components/FiuumberMap";
import { LatLng } from "react-native-maps";
import { TextInput } from "react-native-paper";
import { GooglePlacesInput } from "../components/GooglePlacesInput";
import { Pallete } from "../constants/Pallete";
import { TripsService } from "../services/TripsService";

interface PassengerHomeScreenProps { }

export const PassengerHomeScreen: FC<PassengerHomeScreenProps> = (): ReactElement => {

    const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);
    const [origin, setOrigin] = React.useState<LatLng | null>(null);
    const [destination, setDestination] = React.useState<LatLng | null>(null);
    const [mapRef, setMapRef] = useState<any | null>(null);
    const [realtimeLocation, setRealtimeLocation] = React.useState<any>(null);
    const [fare, setFare] = React.useState<number>(0);
    const [loading, setLoading] = React.useState<boolean>(false);

    const [findTripvisible, setFindTripVisible] = React.useState(false);

    const showFindTripModal = () => setFindTripVisible(true);

    const onClickContinue = () => {
        bottomSheetRef.current?.snapToIndex(0);
    }

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    const setMinHeightBottomSheet = () => {
        if (origin && destination) return '30%';
        if (!currentTrip) return '20%';
        return '20%';
    }

    // variables
    const snapPoints = useMemo(() => [setMinHeightBottomSheet(), '100%'], [currentTrip, origin, destination]);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
    }, []);

    const focusTextField = () => {
        bottomSheetRef.current?.snapToIndex(1);
    }

    const onClickChangeDirections = () => {
        setOrigin(null);
        setDestination(null);
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

    React.useEffect(() => {
        if (origin && destination) bottomSheetRef.current?.snapToIndex(0);
        refreshFare();
    }, [origin, destination]);

    return (
        <>
            <FiuumberMap position={realtimeLocation} onMapRef={setMapRef} origin={origin} destination={destination}></FiuumberMap>
            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                {
                    !origin || !destination ?
                        <>
                            <View style={styles.contentContainer}>
                                <InfoCard title="Welcome back to Fiuumber" subtitle="Tell us where we are going"></InfoCard>
                                <View style={styles.containerAutocomplete}>
                                    <GooglePlacesInput placeholder="Origin" containerStyles={styles.autocomplete} listView={styles.listViewOrigin} focus={focusTextField} onPress={(_data, details = null) => {
                                        if (!details) setOrigin(null);
                                        const position = { latitude: details?.geometry.location.lat || 0, longitude: details?.geometry.location.lng || 0 };
                                        // setOriginAddress(_data.description);
                                        setOrigin(position);
                                    }}></GooglePlacesInput>

                                    <GooglePlacesInput placeholder="Destination" containerStyles={styles.autocomplete} listView={styles.listViewDestination} focus={focusTextField} onPress={(_data, details = null) => {
                                        if (!details) setDestination(null);
                                        const position = { latitude: details?.geometry.location.lat || 0, longitude: details?.geometry.location.lng || 0 };
                                        // setDestinationAddress(_data.description);
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
                        </>
                        :
                        <>
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
                                        <Button mode="contained" style={{ marginTop: 15 }} onPress={onClickContinue}>Get your Fiuumber!</Button>
                                        <Button mode="outlined" style={{ marginTop: 15 }} onPress={onClickChangeDirections}>Change directions</Button>
                                    </View>
                                </>
                                : <></>}
                        </>
                }
            </BottomSheet>
        </>
    )
};

export default PassengerHomeScreen;

const styles = StyleSheet.create({
    container: {
    },
    contentContainer: {
        padding: 10
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
    }
});
