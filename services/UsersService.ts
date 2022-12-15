import axios from 'axios';// For API consuming
import { URL_USERS } from "./Constants";
import { User } from '../models/user';
import { Report } from '../models/report';

import { AuthService } from './AuthService';

export const UsersService = {
    getUser: async (userId: number): Promise<User | null> => {
        try {
            const url = `${URL_USERS}/user/${userId}`;
            const response = await axios.get(url, AuthService.getHeaders(),);
            const user: User = response.data;
            return user;
        }
        catch (error: any) {
            console.log(`UsersService getUser: ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },
    createReport: async (passengerId: number, driverId: number, reason: string): Promise<Report | null> => {
        try {
            const url = `${URL_USERS}/report`;
            console.log(url)
            const req = {
                "passengerId": passengerId,
                "driverId": driverId,
                "reason": reason,
            };
            return await axios.post(url, req, AuthService.getHeaders(),);
        }
        catch (error: any) {
            console.log(`UsersService getUser: ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },

    setNotificationsToken: async (userId: number, token: string): Promise<User | null> => {
        try {
            const url = `${URL_USERS}/user/${userId}/notifications-token`;
            const response = await axios.post(url, { token }, AuthService.getHeaders(),);
            const user: User = response.data;
            return user;
        }
        catch (error: any) {
            if (error && error.response && error.response.status == 400) {
                console.log(`Bad request, cannot set token for notifications: ${error}`);
                return null;
            }

            console.log(`UsersService setNotificationsToken: ${error}`);

            throw error;
        }
    }
};
