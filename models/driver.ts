import { User } from "./user";
import { Wallet } from "./wallet";

export class Driver extends User {
  profile: string;
  wallet: Wallet;

  constructor(
    userId: number,
    email: string,
    firstName: string,
    lastName: string,
    address: string,
    password: string,
    username: string,
    wallet: Wallet,
  ) {

    super(userId, email, firstName, lastName, address, password, username, wallet.walletPrivateKey);
    this.wallet = wallet;

    this.profile = "Driver";
  }
}
