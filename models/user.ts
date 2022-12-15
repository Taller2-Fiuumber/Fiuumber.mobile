export abstract class User {
  id: number;
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  password: string;
  blocked:boolean;
  username: string
  walletAddress: string
  accountType: string;

  abstract profile: string;

  constructor(
    userId: number,
    email: string,
    firstName: string,
    lastName: string,
    address: string,
    password: string,
    username: string,
    accountType: string,
    walletAddress: string
  ) {
    this.userId = userId;
    this.id = userId;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.password = password;
    this.blocked = false;
    this.username = username;
    this.accountType = accountType;
    this.walletAddress = walletAddress;
  }
}
