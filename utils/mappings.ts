import { Calification, Trip } from "../models/trip"

export const mapTrip = (rawTrip: any): Trip => {
    return {...rawTrip, toLatitude: rawTrip.to_latitude, toLongitude: rawTrip.to_longitude, fromLatitude: rawTrip.from_latitude, fromLongitude: rawTrip.from_longitude, fromAddress: rawTrip.from_address, toAddress: rawTrip.to_address, finalPrice: rawTrip.finalPrice};
}

export const mapCalification = (rawCalification: any): Calification => {
    return {...rawCalification, passengerId: rawCalification.passengerId, driverId: rawCalification.driverId, tripId: rawCalification.tripId, createdAt: rawCalification.createdAt, updatedAt: rawCalification.updatedAt, stars: rawCalification.stars, comments: rawCalification.comments, reviewer: rawCalification.reviewer};
}

