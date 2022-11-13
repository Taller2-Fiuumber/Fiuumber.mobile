import React, { FC } from 'react';
import { StyleSheet } from "react-native";
import { Pallete } from '../constants/Pallete';
import { Modal, Text, ProgressBar, Button } from 'react-native-paper';
import { BasicModalProps } from '../models/props/basic-modal-props';
import { Trip } from '../models/trip';
import { TripsService } from '../services/TripsService';
import { User } from '../models/user';
import { AuthService } from '../services/AuthService';
import { set, ref, onChildAdded, query } from "firebase/database";
import { FirebaseService } from "../services/FirebaseService";
import { UsersService } from '../services/UsersService';
import { TripStatus } from '../enums/trip-status';

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
  }
});

interface FindTripModalPros extends BasicModalProps {
  origin: any;
  destination: any;
  originAddress: string;
  destinationAddress: string;// TODO juntar todo en un solo objeto
  onAcceptedTrip: (trip: Trip) => void;
}

const defaultStyles = { backgroundColor: 'white', padding: 20, margin: 10 };

export const FindTripModal: FC<FindTripModalPros> = ({ visible, onDismiss, contentContainerStyle, origin, destination, originAddress, destinationAddress, onAcceptedTrip }: FindTripModalPros) => {

  // Logged in user
  const user: User | undefined = AuthService.getCurrentUserToken()?.user;

  if (!user) return <></>;

  const addTrip = async () => {
    try {
      let trip: Trip = {
        _id: "",
        passengerId: user.id.toString(),
        driverId: "",
        fromLatitude: origin.latitude,
        fromLongitude: origin.longitude,
        toLatitude: destination.latitude,
        toLongitude: destination.longitude,
        start: new Date(),// Debería ser autogenerado en la DB
        finish: new Date(),// Debería ser autogenerado en la DB
        subscription: "NORMAL",
        status: TripStatus.Requested,
        finalPrice: 0, // Deberia calcularse en back
        fromAddress: originAddress,
        toAddress: destinationAddress
      };

      return await TripsService.create(trip);
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  }

  const addTripToFirebase = async (tripId: string, status: string) => {
    const reference = ref(FirebaseService.db, `trips/${status}/${tripId}`);
    return set(reference, {
      tripId: tripId,
      status: status,
    });
  }

  const watchForDriverAssigned = () => {
    const reference = ref(FirebaseService.db, `/trips/${TripStatus.DriverAssigned}`);
    onChildAdded(query(reference), async snapshot => {
      const tripStatus: { tripId: string, status: string } | null = snapshot.val();
      if (tripStatus) {
        const trip: Trip | null = await TripsService.get(tripStatus.tripId);
        if (trip) onAcceptedTrip(trip);
      }
    });
  };


  const requestTrip = async () => {

    const createdTrip: Trip | null = await addTrip();

    if (createdTrip) {
      await addTripToFirebase(createdTrip?._id, createdTrip?.status);
      watchForDriverAssigned();
    }


  }

  React.useEffect(() => {
    requestTrip();
  }, []);

  return (
    <>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={{ ...defaultStyles, ...contentContainerStyle }}>
        <Text variant="titleMedium" style={styles.title}>Creating trip</Text>
        <ProgressBar indeterminate color={Pallete.greenBackground} />
        <Button style={styles.cancelButton} textColor='red' mode='outlined' onPress={onDismiss}>
          CANCEL TRIP
        </Button>
      </Modal>
    </>
  );
}

export default FindTripModal;
