import React, { FC } from 'react';
import { StyleSheet, View } from "react-native";
import { Pallete } from '../constants/Pallete';
import { Modal, Text, Button } from 'react-native-paper';
import { BasicModalProps } from '../models/props/basic-modal-props';
import { Trip } from '../models/trip';
import { TripsService } from '../services/TripsService';
import { User } from '../models/user';
import { UsersService } from '../services/UsersService';
import { AuthService } from '../services/AuthService';
import { ref, remove } from 'firebase/database';
import { FirebaseService } from '../services/FirebaseService';
import { TripDriverResponse } from '../enums/trip-driver-response';
import { TripStatus } from '../enums/trip-status';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Pallete.whiteColor,
        padding: 20,
    },
    title: {
        marginBottom: 10,
        color: Pallete.darkColor
    },
    cancelButton: {
        marginTop: 20,
        borderColor: 'red'
    },
    acceptButton: {
        marginTop: 10,
    },
});
interface RequestedTripModalProps extends BasicModalProps {
    tripId: string,
    onAccepted: (trip: Trip) => void;
}

const defaultStyles = { backgroundColor: 'white', padding: 20, margin: 10 };

export const RequestedTripModal: FC<RequestedTripModalProps> = ({ visible, onDismiss, onAccepted, contentContainerStyle, tripId }: RequestedTripModalProps) => {

    const [user, setUser] = React.useState<User | null>();
    const [trip, setTrip] = React.useState<Trip | null>();
    const [fare, setFare] = React.useState<number>();

    const loadData = async () => {
        const trip: Trip | null = await TripsService.get(tripId);

        if (trip) {
            // |J| ojo, deberíamos guardar la cifra calculada que se le mostró al usuario tal vez
            // para que no haya inconsistencias si cambian las reglas de calculo

            // TODO: traer en requests paralelas
            const tripFare: number = await TripsService.getFare(trip.fromLatitude, trip.toLatitude, trip.fromLongitude, trip.toLongitude);
            setFare(tripFare);
            setTrip(trip);
            const userId: number = Number.parseInt(trip.passengerId);
            const user: User | null = await UsersService.getUser(userId);
            setUser(user);
        }
    };

    const acceptTrip = async () => {
        const driverId: number | undefined = AuthService.getCurrentUserToken()?.user.id
        if (!driverId) return;
        try {
            const updatedTrip: Trip | null = await TripsService.setAssignedDriver(tripId, driverId,);
            setTrip(updatedTrip);
            await FirebaseService.removeRequestedTrip(tripId);
            dissmissDialog(TripDriverResponse.Accepted);
        }
        catch (error: any) {
            console.error(error);
            dissmissDialog(TripDriverResponse.Dismissed);
            //throw error;
        }
    };

    const dissmissDialog = (status: TripDriverResponse) => {
        if (status == TripDriverResponse.Accepted && trip) {
            onAccepted(trip);
        }
        else {
            onDismiss();
        }
    }

    React.useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={{ ...defaultStyles, ...contentContainerStyle }}>
                {user ? <Text variant="titleSmall" style={styles.title}>{user.firstName} {user.lastName} wants to travel</Text> : <></>}
                {/* {trip ?  <Text variant="titleMedium">15 min</Text> : <></>} */}
                {trip ? <Text variant="displayMedium" style={{ color: Pallete.darkColor }}>ETH {fare}</Text> : <></>}
                <Button style={styles.cancelButton} textColor='red' mode='outlined' onPress={() => dissmissDialog(TripDriverResponse.Rejected)}>
                    DECLINE
                </Button>
                <Button style={styles.acceptButton} mode='contained' onPress={acceptTrip}>
                    ACCEPT
                </Button>
            </Modal>
        </>
    );
}

export default RequestedTripModal;
