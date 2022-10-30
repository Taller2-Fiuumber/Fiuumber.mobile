import axios from 'axios';// For API consuming
import { UserToken } from '../models/user-token';
import { HEADERS, URL_AUTH, URL_USERS } from "./Constants";
import { Passenger } from '../models/passenger';

let _userToken: UserToken | null;
export const AuthService = {
    getCurrentUserToken: (): UserToken | null => _userToken,
    setCurrentUserToken: (userToken: UserToken | null): void => {_userToken = userToken},
    login: async (email: string, password: string): Promise<UserToken | null> => {
        try {
            const url = `${URL_AUTH}/login?email=${email}&password=${password}`;
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
            const url = `${URL_AUTH}/register-passenger`;
            await axios.post(url, {passenger}, HEADERS);
            return true;
        } 
        catch (error: any) {
            console.log(error);
            throw error;
        }
    }
};