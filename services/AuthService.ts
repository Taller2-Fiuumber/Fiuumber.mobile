import axios from 'axios';// For API consuming
import { UserToken } from '../models/user-token';
import { HEADERS, URL_USERS } from "./Constants";
import { Passenger } from '../models/passenger';

export const AuthService = {
    login: async (email: string, password: string): Promise<UserToken | null> => {
        try {
            const url = `${URL_USERS}/login?email=${email}&password=${password}`;
            console.log(url);
            const response = await axios.get(url, HEADERS);
            const userToken: UserToken = response.data;
            return userToken;
        } 
        catch (error: any) {
            console.log(error);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },
    registerPassenger: async (passenger: Passenger): Promise<boolean> => {
        try {
            console.log(passenger);
            const url = `${URL_USERS}/register-passenger`;
            console.log(url);
            const response = await axios.post(url, {passenger}, HEADERS);
            return true;
        } 
        catch (error: any) {
            console.log(error);
            throw error;
        }
    }
};