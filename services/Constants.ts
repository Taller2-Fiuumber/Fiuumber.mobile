import { CONFIG } from "../config";

export const URL_USERS = `${CONFIG.gatewayURL}${CONFIG.usersBasePath}`;
export const URL_TRIPS = `${CONFIG.gatewayURL}${CONFIG.tripsBasePath}`//`${CONFIG.gatewayURL}${CONFIG.tripsBasePath}`;
export const URL_AUTH = `${CONFIG.gatewayURL}${CONFIG.authBasePath}`;
export const RAW_HEADERS = { Accept: 'application/json'};
export const HEADERS = { headers: RAW_HEADERS };