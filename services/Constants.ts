import { CONFIG } from "../config";

export const URL_USERS = `${CONFIG.gatewayURL}${CONFIG.usersBasePath}`;
export const URL_TRIPS = `${CONFIG.gatewayURL}${CONFIG.tripsBasePath}`;
export const HEADERS = { headers: { Accept: 'application/json'}};