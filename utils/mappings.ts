import { Deposit } from "../models/deposit";
import { Trip } from "../models/trip"

export const mapTrip = (rawTrip: any): Trip => {
    return {...rawTrip, toLatitude: rawTrip.to_latitude, toLongitude: rawTrip.to_longitude, fromLatitude: rawTrip.from_latitude, fromLongitude: rawTrip.from_longitude, fromAddress: rawTrip.from_address, toAddress: rawTrip.to_address, finalPrice: rawTrip.finalPrice};
}

export const mapDeposit = (rawDeposit: any): Deposit => {
    const depositType: string = rawDeposit.type == "from sender to owner" ? "WITHDRAW" : "CREDIT";
    const ammount: string = typeof rawDeposit.amountSent === 'object' ? "-" : rawDeposit.amountSent.toString();
    return { _id: rawDeposit._id, txHash: rawDeposit.txHash, ammountSent: ammount, type: depositType, senderAddress: rawDeposit.senderAddress };
}