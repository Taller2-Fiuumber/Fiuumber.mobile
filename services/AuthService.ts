import axios from 'axios';// For API consuming
import { UserToken } from '../models/user-token';
import { HEADERS, RAW_HEADERS, URL_AUTH, URL_USERS } from "./Constants";
import { Passenger } from '../models/passenger';
import { Driver } from '../models/driver';
import { DriverVehicle } from '../models/driver_vehicle';
import { Vehicle } from '../models/vehicle';

let _userToken: UserToken | null;
export const AuthService = {
    getCurrentUserToken: (): UserToken | null => _userToken,
    setCurrentUserToken: (userToken: UserToken | null): void => {_userToken = userToken},
    getHeaders: () => { return { headers: {...RAW_HEADERS, 'auth-token': _userToken?.token}}},
    checkEmailIsUsed: async (email: string): Promise<boolean | null> => {
        try {
            const url = `${URL_USERS}/user/check-if-exists/${email}`;
            const response = await axios.get(url, AuthService.getHeaders(),);
            const exists: boolean = response.data;
            return exists;
        }
        catch (error: any) {
            console.log(error);
            if (error && error.response && error.response.status == 404) return null;
            throw error;
        }
    },
    login: async (email: string, password: string): Promise<UserToken | null> => {
        try {
            const url = `${URL_AUTH}/login?email=${email}&password=${password}`;
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
    loginWithGoogle: async (email: string, password: string): Promise<UserToken | null> => {
        try {
            const url = `${URL_AUTH}/loginGoogle?email=${email}&password=${password}`;
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
            passenger.accountType = "EMAIL";
            const url = `${URL_AUTH}/register-passenger`;
            let response = await axios.post(url, {passenger}, HEADERS);
            if (response.status >= 200 && response.status < 400) {
                return true;
            }
            return false;
        }
        catch (error: any) {
            console.log(error);
            throw error;
        }
    },
    registerPassengerWithGoogle: async (passenger: Passenger): Promise<boolean> => {
        try {
            passenger.accountType = "GOOGLE";
            const url = `${URL_AUTH}/register-passenger`;
            await axios.post(url, {passenger}, HEADERS);
            return true;
        }
        catch (error: any) {
            console.log(error);
            throw error;
        }
    },
    registerDriver: async (driver: Driver): Promise<boolean> => {
        try {
            driver.accountType = "EMAIL";
            const url = `${URL_AUTH}/register-driver`;
            await axios.post(url, {driver}, HEADERS);
            return true;
        }
        catch (error: any) {
            console.log(error);
            throw error;
        }
    },
    updatePassenger: async (passenger: Passenger): Promise<boolean> => {
        try {
            if (_userToken != null) {
                const url = `${URL_USERS}/passenger`;
                await axios.put(url, passenger, AuthService.getHeaders(),);
                _userToken.user = passenger;
                return true;
            }
            return false;
        }
        catch (error: any) {
            console.log(error);
            throw error;
        }
    },
    updateDriver: async (driver: Driver): Promise<boolean> => {
        try {
            if (_userToken != null) {
                const url = `${URL_USERS}/driver`;
                await axios.put(url, driver, AuthService.getHeaders(),);
                return true;
            }
            return false;
        }
        catch (error: any) {
            console.log(error);
            throw error;
        }
    },
    getCurrentDriver: async (): Promise<Driver | undefined> => {
        try {
            if (_userToken != null) {
                const driver_url = `${URL_USERS}/driver/${_userToken.user.id}`;

                let user =  await axios.get(driver_url, AuthService.getHeaders(),);

                let res = user.data.user
                res["vehicle"] = user.data.driverVehicle
                res["userId"] = _userToken.user.id

                return res
            }
            return undefined;
        }
        catch (error: any) {
            console.log(error);
            throw error;
        }
    },
    getCurrentPassenger: async (): Promise<Passenger | undefined> => {
        try {
            if (_userToken != null) {
                const passenger_url = `${URL_USERS}/passenger/${_userToken.user.id}`;

                let user =  await axios.get(passenger_url, AuthService.getHeaders(),);
                let res = user.data.user
                res["userId"] = _userToken.user.id

                return res
            }
            return undefined;
        }
        catch (error: any) {
            console.log(error);
            throw error;
        }
    },
    getDriver: async (driverId: number): Promise<Driver | null> => {
        try {
            const url = `${URL_USERS}/driver/${driverId}`;

            let user =  await axios.get(url, AuthService.getHeaders(),);
            let res = user.data.user
            res["vehicle"] = user.data.driverVehicle

            return res
        }
        catch (error: any) {
            console.log(error);
            throw error;
        }
    },
};
