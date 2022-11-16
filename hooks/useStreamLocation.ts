import { useEffect, useState } from "react";
import { LatLng } from "react-native-maps";
import { Trip } from "../models/trip";
import { FirebaseService } from "../services/FirebaseService";

export const useStreamLocation = (trip: Trip | null, location: LatLng | null, profile: "DRIVER" | "PASSENGER") => {

  const [lastLocation, setLastLocation] = useState<LatLng | null>(null);

  useEffect(() => {
    if (!location || !trip) return;

    if (lastLocation?.latitude != location.latitude || lastLocation.longitude != location.longitude) {
        // Solo updateo firebase si cambia la ubicación
        if (profile === "DRIVER") FirebaseService.updateDriverLocation(trip._id, location).then((_data) => setLastLocation(location));
        else FirebaseService.updatePassengerLocation(trip._id, location).then((_data) => setLastLocation(location));
    }

  }, [location, trip]);

  return lastLocation;
}