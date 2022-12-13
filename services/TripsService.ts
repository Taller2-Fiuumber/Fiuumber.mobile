import axios from 'axios';// For API consuming
import { TripStatus } from '../enums/trip-status';
import { Trip, Calification } from '../models/trip';
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
            const tripResponse: Trip[] = response.data.map(mapTrip);
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
        console.log(url);
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
    createCalification: async (passengerId: string, driverId: string | undefined, tripId: string, stars: number, comments: string, reviewer: string | undefined): Promise<Calification | null> => {
        const url = `${URL_TRIPS}/calification`;

        try {

            const calificationReq = {
                "passengerId": passengerId,
                "driverId": driverId,
                "tripId": tripId,
                "createdAt": "2022-11-14T22:35:53.448856",
                "updatedAt": "2022-11-14T22:35:53.448859",
                "stars": stars,
                "comments": comments,
                "reviewer": reviewer
            };
            return await axios.post(url, calificationReq, AuthService.getHeaders(),);
        }
        catch (error: any) {
            console.log(`TripsService createCalification(): ${url} ${error}`);
            if (error && error.response && error.response.status == 401)
            throw error;
            return null
        }
    },
    getLastTripPassenger: async (userId: number): Promise<Trip | null> => {
        try {
            const url = `${URL_TRIPS}/passenger/${userId}?skip=0&limit=1`;
            const response = await axios.get(url, AuthService.getHeaders(),);
            if (!response.data[0]) return null;
            const tripResponse: Trip = mapTrip(response.data[0]);
            return tripResponse;
        }
        catch (error: any) {
            console.log(`TripsService getLastTripPassenger(): ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },
    getLastTripDriver: async (userId: number): Promise<Trip | null> => {
        try {
            const url = `${URL_TRIPS}/driver/${userId}?skip=0&limit=1`;
            const response = await axios.get(url, AuthService.getHeaders(),);
            if (!response.data[0]) return null;
            const tripResponse: Trip = mapTrip(response.data[0]);
            return tripResponse;
        }
        catch (error: any) {
            console.log(`TripsService getLastTripDriver(): ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },
};
