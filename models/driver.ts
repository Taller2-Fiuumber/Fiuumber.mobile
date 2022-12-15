import { User } from "./user";
import { DriverVehicle } from "./driver_vehicle";

export class Driver extends User {
  vehicle: DriverVehicle;
  profile: string;

  constructor(
    userId: number,
    email: string,
    firstName: string,
    lastName: string,
    address: string,
    password: string,
    username: string,
    walletPrivateKey: string,
    accountType: string,
    vehicle: DriverVehicle,
  ) {
    super(userId, email, firstName, lastName, address, password, username, walletPrivateKey, accountType);
    this.vehicle = vehicle;

    this.profile = "DRIVER";
  }
}
