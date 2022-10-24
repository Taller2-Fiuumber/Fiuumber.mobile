import axios from 'axios';// For API consuming
import { HEADERS, URL_USERS } from "./Constants";
import { User } from '../models/user';

export const UsersService = {
    getUser: async (userId: number): Promise<User | null> => {
        try {
            const url = `${URL_USERS}/users/${userId}`;
            const response = await axios.get(url, HEADERS);
            const user: User = response.data;
            return user;
        } 
        catch (error: any) {
            console.log(`UsersService getUser: ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },
};