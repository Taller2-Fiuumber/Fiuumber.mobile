import axios from 'axios';// For API consuming
import { Deposit } from '../models/deposit';
import { mapDeposit } from '../utils/mappings';
import { AuthService } from './AuthService';
import { URL_PAYMENTS } from "./Constants";

export const PaymentsService = {
    getBalance: async (walletAddress: string): Promise<number | null> => {
        try {
            const url = `${URL_PAYMENTS}/wallet/balance/${walletAddress}`;
            const response = await axios.get(url, AuthService.getHeaders(),);
            const balance: number = response.data;
            return balance;
        }
        catch (error: any) {
            console.log(`PaymentsService getBalance(): ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },
    depositToReceiver: async (amountInEthers: number, receiverAddress: string): Promise<string | null> => {
        try {
            const url = `${URL_PAYMENTS}/depositToReceiver`;
            const response = await axios.post(url, {amountInEthers: amountInEthers.toString(), receiverAddress}, AuthService.getHeaders(),);
            const { hash } = response.data;
            return hash;
        }
        catch (error: any) {
            console.log(`PaymentsService depositToReceiver(): ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },
    retrieveFromWallet: async (amountInEthers: number, retrieverAddress: string): Promise<string | null> => {
        try {
            const url = `${URL_PAYMENTS}/retrieveFromWallet`;
            const response = await axios.post(url, {amountInEthers: amountInEthers.toString(), retrieverAddress}, AuthService.getHeaders(),);
            const { hash } = response.data;
            return hash;
        }
        catch (error: any) {
            console.log(`PaymentsService retrieveFromWallet(): ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },
    deposits: async (): Promise<Deposit[]> => {
        try {
            const url = `${URL_PAYMENTS}/deposits`;
            const response = await axios.get(url, AuthService.getHeaders(),);
            return response.data ? response.data.map(mapDeposit) : [];
        }
        catch (error: any) {
            console.log(`PaymentsService deposits(): ${error}`);
            if (error && error.response && error.response.status == 401) return [];
            throw error;
        }
    },
};
