import { useEffect, useState } from "react";
import { LatLng } from "react-native-maps";
import * as Location from 'expo-location';

export const useRealtimeLocation = (refreshTime: number) => {

    const [location, setLocation] = useState<LatLng | null>(null);
    const [status, setStatus] = useState<string | null>(null);

    useEffect(() => {
        Location.requestForegroundPermissionsAsync().then((value) => {
            let { status } = value;
            setStatus(status);
        });
    }, []);

    const updateLocation = async () => {
        if (status !== 'granted') return;

        let location = await Location.getCurrentPositionAsync({});
        const rtLocation: LatLng = { latitude: location.coords.latitude, longitude: location.coords.longitude };
        
        setLocation(rtLocation);
    }

    useEffect(() => {
        if (!status) return;
        const intervalCall = setInterval(() => {
          updateLocation();
        }, refreshTime);
        return () => {
          // clean up
          clearInterval(intervalCall);
        };
      }, [status]);

    return location;
}