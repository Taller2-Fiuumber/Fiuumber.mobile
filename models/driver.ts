import { User } from "./user";
import { Wallet } from "./wallet";
import { DriverVehicle } from "./driver_vehicle";

export class Driver extends User {
  profile: string;
  wallet: Wallet;
  vehicle: DriverVehicle;

  constructor(
    userId: number,
    email: string,
    firstName: string,
    lastName: string,
    address: string,
    password: string,
    username: string,
    wallet: Wallet,
    vehicle: DriverVehicle,
  ) {

    super(userId, email, firstName, lastName, address, password, username, wallet.walletPrivateKey);
    this.wallet = wallet;
    this.vehicle = vehicle;
    this.profile = "DRIVER";
  }
}
