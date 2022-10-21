import { CONFIG } from "../config";

export const URL_USERS = `${CONFIG.gatewayURL}${CONFIG.usersBasePath}`;
export const URL_TRIPS = `http://10.0.2.2:8081${CONFIG.tripsBasePath}`//`${CONFIG.gatewayURL}${CONFIG.tripsBasePath}`;
export const HEADERS = { headers: { Accept: 'application/json'}};