import axios from 'axios';// For API consuming
import { Trip } from '../models/trip';
import { AuthService } from './AuthService';
import { HEADERS, URL_TRIPS } from "./Constants";

export const TripsService = {
    create: async (trip: Trip): Promise<Trip | null> => {
        try {
            const url = `${URL_TRIPS}/trip`;
            const tripReq = {
                "passengerId": trip.passengerId,
                "driverId": trip.driverId,
                "from_latitude": trip.fromLatitude,
                "from_longitude": trip.fromLongitude,
                "to_latitude": trip.toLatitude,
                "to_longitude": trip.toLongitude,
                "start": trip.start,
                "finish": trip.finish,
                "subscription": trip.subscription,
                // "status": trip.status,
                "finalPrice": trip.finalPrice
            };
            const response = await axios.post(url, tripReq, HEADERS);
            const tripResponse: Trip = response.data;
            return tripResponse;
        } 
        catch (error: any) {
            console.error(error);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },

    updateStatus: async (tripId: number, status: string): Promise<Trip | null> => {
        try {
            const url = `${URL_TRIPS}/trips/${tripId}/status`;
            const tripReq = {status};
            const response = await axios.put(url, tripReq, HEADERS);
            const tripResponse: Trip = response.data;
            return tripResponse;
        } 
        catch (error: any) {
            console.error(error);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },
    get: async (tripId: number): Promise<Trip | null> => {
        try {
            const url = `${URL_TRIPS}/trips/${tripId}`;
            const response = await axios.get(url, HEADERS);
            const tripResponse: Trip = response.data;
            return tripResponse;
        } 
        catch (error: any) {
            console.error(error);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },
    getMyTrips: async (): Promise<Trip[] | null> => {
        const userId: number | undefined = AuthService.getCurrentUserToken()?.user.id;
        if (!userId) return [];

        try {
            const url = `${URL_TRIPS}/trips?userId=${userId}`;
            const response = await axios.get(url, HEADERS);
            const tripResponse: Trip[] = response.data;
            return tripResponse;
        } 
        catch (error: any) {
            console.error(error);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },
};