import { UserData } from "./user_data";
import { Wallet } from "./wallet";
import { DriverVehicle } from "./driver_vehicle";

export class Driver {
  user: UserData;
  wallet: Wallet;
  driverVehicle: DriverVehicle;

  constructor(
    user: UserData,
    wallet: Wallet,
    driverVehicle: DriverVehicle,
  ) {

    this.wallet = wallet;
    this.driverVehicle = driverVehicle;
    this.user = user;
  }
}

export class DriverData {
  userId: number
  email: string
  firstName: string
  lastName: string
  address: string
  password: string
  username: string
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

    this.wallet = wallet;
    this.vehicle = vehicle;
    this.userId = userId;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.password = password;
    this.username = username;
  }
}
