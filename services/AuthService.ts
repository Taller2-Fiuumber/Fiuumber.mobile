import axios from 'axios';// For API consuming
import { UserToken } from '../models/user-token';
import { HEADERS, RAW_HEADERS, URL_AUTH, URL_USERS } from "./Constants";
import { Passenger } from '../models/passenger';
import { Driver, DriverData } from '../models/driver';
import { DriverVehicle } from '../models/driver_vehicle';
import { Vehicle } from '../models/vehicle';

let _userToken: UserToken | null;
export const AuthService = {
    getCurrentUserToken: (): UserToken | null => _userToken,
    setCurrentUserToken: (userToken: UserToken | null): void => {_userToken = userToken},
    getHeaders: () => { return { headers: {...RAW_HEADERS, 'auth-token': _userToken?.token}}},
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
    },
    registerDriver: async (driver: Driver): Promise<boolean> => {
        try {
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
                const driver_data = new DriverData(
                    driver.user.userId,
                    driver.user.email,
                    driver.user.firstName,
                    driver.user.lastName,
                    driver.user.address,
                    driver.user.password,
                    driver.user.username,
                    driver.wallet,
                    driver.driverVehicle
                )
                await axios.put(url, driver_data, AuthService.getHeaders(),);
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
                return user.data
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
                return user.data
            }
            return undefined;
        }
        catch (error: any) {
            console.log(error);
            throw error;
        }
    },
};
