import React, { FC } from 'react';
import { StyleSheet, View } from "react-native";
import { Pallete } from '../constants/Pallete';
import { Modal, Text, Button } from 'react-native-paper';
import { BasicModalProps } from '../models/props/basic-modal-props';
import { Trip } from '../models/trip';
import { TripsService } from '../services/TripsService';
import { User } from '../models/user';
import { UsersService } from '../services/UsersService';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Pallete.whiteColor, 
    padding: 20, 
   },
   title: {
    marginBottom: 10
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
}

const defaultStyles = {backgroundColor: 'white', padding: 20, margin: 10};
  
export const RequestedTripModal: FC<RequestedTripModalProps> = ({visible, onDismiss, contentContainerStyle, tripId}: RequestedTripModalProps) => {
    
    const [user, setUser] = React.useState<User | null>();
    const [trip, setTrip] = React.useState<Trip | null>();
    const [fare, setFare] = React.useState<number>();

    const loadData = async () => {
        const trip: Trip | null = await TripsService.get(tripId);

        if (trip) {
            // |J| ojo, deberíamos guardar la cifra calculada que se le mostró al usuario tal vez
            // para que no haya inconsistencias si cambian las reglas de calculo
            const tripFare: number = await TripsService.getFare(trip.fromLatitude, trip.toLatitude, trip.fromLongitude, trip.toLongitude);
            setFare(tripFare);
            setTrip(trip);
            const userId: number = Number.parseInt(trip.passengerId);
            const user: User | null = await UsersService.getUser(userId);
            setUser(user);
        }
    };

    const acceptTrip = async () => {

    };

    React.useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={{...defaultStyles, ...contentContainerStyle}}>
                {user ? <Text variant="titleSmall" style={styles.title}>{user.firstName} {user.lastName} wants to travel</Text> : <></>}
                {/* {trip ?  <Text variant="titleMedium">15 min</Text> : <></>} */}
                {trip ?  <Text variant="displayMedium">$ {fare}</Text> : <></>}
                <Button style={styles.cancelButton} textColor='red' mode='outlined' onPress={onDismiss}>
                    DECLINE
                </Button>
                <Button style={styles.acceptButton}  mode='contained' onPress={() => console.log('Pressed')}>
                    ACCEPT
                </Button>
            </Modal>
        </>
    );
  }

  export default RequestedTripModal;
