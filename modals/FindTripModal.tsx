import React, { FC, useState } from 'react';
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
    marginBottom: 10,
    color: Pallete.darkColor
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
  currentTrip: Trip | null;
  fare: number;
}

const defaultStyles = { backgroundColor: 'white', padding: 20, margin: 10 };

export const FindTripModal: FC<FindTripModalPros> = ({ fare, visible, onDismiss, contentContainerStyle, origin, destination, originAddress, destinationAddress, onAcceptedTrip, currentTrip }: FindTripModalPros) => {

  // Logged in user
  const user: User | undefined = AuthService.getCurrentUserToken()?.user;

  const [statusText, setStatusText] = useState<string>("Creating trip...");

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
        finalPrice: fare, // Deberia calcularse en back
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

  const watchForDriverAssigned = (tripId: string) => {
    const reference = ref(FirebaseService.db, `/trips/${tripId}`);
    onChildAdded(query(reference), async snapshot => {
      const tripStatus: { driver: any } | null = snapshot.val();
      if (tripStatus) {
        const trip: Trip | null = await TripsService.get(tripId);
        if (trip && trip.status == TripStatus.DriverAssigned) {
          onAcceptedTrip(trip);
        }
      }
    });
  };


  const requestTrip = async () => {

    const createdTrip: Trip | null = currentTrip ? currentTrip : await addTrip();

    if (createdTrip) {
      await FirebaseService.appendRequestedTrip(createdTrip._id,);
      setStatusText("Waiting approval...");
      watchForDriverAssigned(createdTrip?._id);
    }


  }

  React.useEffect(() => {
    requestTrip();
  }, []);

  return (
    <>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={{ ...defaultStyles, ...contentContainerStyle }}>
        <Text variant="titleMedium" style={styles.title}>{statusText}</Text>
        <ProgressBar indeterminate color={Pallete.greenBackground} />
        <Button style={styles.cancelButton} textColor='red' mode='outlined' onPress={onDismiss}>
          CANCEL TRIP
        </Button>
      </Modal>
    </>
  );
}

export default FindTripModal;
