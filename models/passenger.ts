import { User } from "./user";
import { Wallet } from "./wallet";

export class Passenger extends User {
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
  ) {

    super(userId, email, firstName, lastName, address, password, username, walletPrivateKey, accountType);
    this.walletPrivateKey = walletPrivateKey;

    this.profile = "PASSENGER";
  }
}
