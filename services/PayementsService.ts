import axios from 'axios';// For API consuming
import { URL_PAYMENTS, } from "./Constants";
import { AuthService } from './AuthService';

export const PaymentsService = {
    depositFromSender: async (senderAddress: string, amountInEthers: number): Promise<string> => {
        try {
            const url = `${URL_PAYMENTS}/depositFromSender`;
            const response = await axios.post(url, {senderAddress, amountInEthers}, AuthService.getHeaders(),);
            const { hash } = response.data;
            return hash;
        } 
        catch (error: any) {
            console.log(`PaymentsService depositFromSender: ${error}`);
            if (error && error.response && error.response.status == 401) return "";
            throw error;
        }
    },
    getDepositStatus: async (depositTxHash: string,): Promise<string> => {
        try {
            const url = `${URL_PAYMENTS}/deposit/${depositTxHash}`;
            const response = await axios.get(url, AuthService.getHeaders(),);
            const { hash } = response.data;
            return hash;
        } 
        catch (error: any) {
            console.log(`PaymentsService getDepositStatus: ${error}`);
            if (error && error.response && error.response.status == 401) return "";
            throw error;
        }
    },
    getBalance: async (address: string,): Promise<string> => {
        try {
            const url = `${URL_PAYMENTS}/wallet/balance/${address}`;
            const response = await axios.get(url, AuthService.getHeaders(),);
            const ammountInEth = response.data;
            return ammountInEth;
        } 
        catch (error: any) {
            console.log(`PaymentsService getBalance: ${error}`);
            if (error && error.response && error.response.status == 401) return "";
            throw error;
        }
    },
};