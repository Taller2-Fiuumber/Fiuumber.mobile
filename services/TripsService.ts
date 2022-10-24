import axios from 'axios';// For API consuming
import { Trip } from '../models/trip';
import { AuthService } from './AuthService';
import { HEADERS, URL_TRIPS } from "./Constants";

export const TripsService = {
    create: async (trip: Trip): Promise<Trip | null> => {
        try {
            const url = `${URL_TRIPS}/trip`;
              const tripReq2 =
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
                "finalPrice": trip.finalPrice
            };
            return await (await axios.post(url, {...tripReq2}, HEADERS,)).data;
        } 
        catch (error: any) {
            console.log(`TripsService create(): ${error}`);
            throw error;
        }
    },
    updateStatus: async (tripId: string, status: string): Promise<Trip | null> => {
        try {
            const url = `${URL_TRIPS}/trip/${tripId}/status`;
            const tripReq = {status};
            const response = await axios.patch(url, tripReq, HEADERS);
            const tripResponse: Trip = response.data;
            return tripResponse;
        } 
        catch (error: any) {
            console.log(`TripsService updateStatus(): ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },
    get: async (tripId: string): Promise<Trip | null> => {
        try {
            const url = `${URL_TRIPS}/trip/${tripId}`;
            const response = await axios.get(url, HEADERS);
            const tripResponse: Trip = response.data;
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
            const response = await axios.get(url, HEADERS);
            const tripResponse: Trip[] = response.data;
            return tripResponse;
        } 
        catch (error: any) {
            console.log(`TripsService getMyTrips(): ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },
};