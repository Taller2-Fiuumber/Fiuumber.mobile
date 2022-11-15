import { useEffect, useState } from "react";
import { LatLng } from "react-native-maps";
import { Trip } from "../models/trip";
import { FirebaseService } from "../services/FirebaseService";

export const useStreamLocation = (trip: Trip | null, location: LatLng | null) => {

  const [lastLocation, setLastLocation] = useState<LatLng | null>(null);

  useEffect(() => {
    if (!location || !trip) return;

    if (lastLocation?.latitude != location.latitude || lastLocation.longitude != location.longitude) {
        // Solo updateo firebase si cambia la ubicación
        console.log("UPDATE FIREBASE", location);
        FirebaseService.updatePassengerLocation(trip._id, location).then((_data) => setLastLocation(location));
    }

    console.log("MY LOCATION", location);

  }, [location, trip]);

  return lastLocation;
}