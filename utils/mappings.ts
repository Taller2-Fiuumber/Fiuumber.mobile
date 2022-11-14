import { Trip } from "../models/trip"

export const mapTrip = (rawTrip: any): Trip => {
    return {...rawTrip, toLatitude: rawTrip.to_latitude, toLongitude: rawTrip.to_longitude, fromLatitude: rawTrip.from_latitude, fromLongitude: rawTrip.from_longitude, fromAddress: rawTrip.from_address, toAddress: rawTrip.to_address, finalPrice: rawTrip.finalPrice};
}