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
  walletPrivateKey: string
  walletAddress: string

  abstract profile: string;

  constructor(
    userId: number,
    email: string,
    firstName: string,
    lastName: string,
    address: string,
    password: string,
    username: string,
    walletPrivateKey: string,
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
    this.walletPrivateKey = walletPrivateKey;
    this.walletAddress = walletAddress;
  }
}
