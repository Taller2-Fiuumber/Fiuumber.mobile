import { CONFIG } from "../config";

export const URL_USERS = `${CONFIG.gatewayURL}${CONFIG.usersBasePath}`;
export const HEADERS = { headers: { Accept: 'application/json'}};