import axios from 'axios';// For API consuming
import { TripStatus } from '../enums/trip-status';
import { Trip } from '../models/trip';
import { mapTrip } from '../utils/mappings';
import { AuthService } from './AuthService';
import { HEADERS, URL_TRIPS } from "./Constants";
import { FirebaseService } from './FirebaseService';

export const TripsService = {
    create: async (trip: Trip): Promise<Trip | null> => {
        try {
            const url = `${URL_TRIPS}/trip`;
              const tripReq =
            {
                "passengerId": trip.passengerId,
                "driverId": trip.driverId,
                "from_latitude": trip.fromLatitude,
                "from_longitude": trip.fromLongitude,
                "to_latitude": trip.toLatitude,
                "to_longitude": trip.toLongitude,
                "start": trip.start,
                "finish": trip.finish,
                "subscription": trip.subscription,
                "status": trip.status,
                "finalPrice": trip.finalPrice,
                "from_address": trip.fromAddress,
                "to_address": trip.toAddress,
            };
            const response = await axios.post(url, {...tripReq}, AuthService.getHeaders());
            return response.data;
        } 
        catch (error: any) {
            console.log(`TripsService create(): ${error}`);
            throw error;
        }
    },
    setAssignedDriver: async (tripId: string, driverId: number): Promise<Trip | null> => {
        try {
            const url = `${URL_TRIPS}/trip/${tripId}/assign-driver`;
            const tripReq = {"driverId": driverId.toString()};
            const response = await axios.post(url, tripReq, AuthService.getHeaders(),);
            await FirebaseService.updateTripStatus(tripId, TripStatus.DriverAssigned); // Notification
            const tripResponse: Trip = mapTrip(response.data);
            return tripResponse;
        } 
        catch (error: any) {
            console.log(`TripsService setAssignedDriver(): ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },
    setTripStatus: async (tripId: string, status: TripStatus): Promise<Trip | null> => {
        try {
            const url = `${URL_TRIPS}/trip/${tripId}/status`;
            const response = await axios.put(url, {status}, AuthService.getHeaders(),);

            await FirebaseService.updateTripStatus(tripId, status); // Notification

            const tripResponse: Trip = mapTrip(response.data);
            return tripResponse;
        } 
        catch (error: any) {
            console.log(`TripsService setTripStatus(): ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },
    get: async (tripId: string): Promise<Trip | null> => {
        try {
            const url = `${URL_TRIPS}/trip/${tripId}`;
            const response = await axios.get(url, AuthService.getHeaders(),);
            const tripResponse: Trip = mapTrip(response.data);
            return tripResponse;
        } 
        catch (error: any) {
            console.log(`TripsService get(): ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },
    getMyTrips: async (): Promise<Trip[] | null> => {
        const userId: number | undefined = AuthService.getCurrentUserToken()?.user.id;
        if (!userId) return [];

        try {
            const url = `${URL_TRIPS}/trips?userId=${userId}`;
            const response = await axios.get(url, AuthService.getHeaders());
            const tripResponse: Trip[] = response.data.map(rawTrip => mapTrip(rawTrip));
            return tripResponse;
        } 
        catch (error: any) {
            console.log(`TripsService getMyTrips(): ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },
    getFare: async (fromLatitude: number, toLatitude: number, fromLongitude: number, toLongitude: number): Promise<number> => {
        const url = `${URL_TRIPS}/fare?from_latitude=${fromLatitude}&to_latitude=${toLatitude}&from_longitude=${fromLongitude}&to_longitude=${toLongitude}`;
        try {
            const response = await axios.get(url, AuthService.getHeaders());
            const tripResponse: number = response.data;
            return tripResponse;
        } 
        catch (error: any) {
            console.log(`TripsService getFare(): ${url} ${error}`);
            if (error && error.response && error.response.status == 401) return 0;
            throw error;
        }
    },
};