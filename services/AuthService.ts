import axios from 'axios';// For API consuming
import { UserToken } from '../models/user-token';
import { HEADERS, URL_USERS } from "./Constants";
import { Passenger } from '../models/passenger';

export const AuthService = {
    login: async (email: string, password: string): Promise<UserToken | null> => {
        try {
            const url = `${URL_USERS}/login?email=${email}&password=${password}`;
            const response = await axios.get(url, HEADERS);
            const userToken: UserToken = response.data;
            return userToken;
        } 
        catch (error: any) {
            if (error.response.status == 401) return null;
            throw error;
        }
    },
    registerPassenger: async (passenger: Passenger): Promise<boolean> => {
        try {
            const url = `${URL_USERS}/register-passenger`;
            const response = await axios.post(url, {passenger}, HEADERS);
            console.log(response.data);
            return true;
        } 
        catch (error: any) {
            throw error;
        }
    }
};