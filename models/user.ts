export abstract class User {
  id: number;
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  password: string;
  username: string
  walletPrivateKey: string

  abstract profile: string;

  constructor(
    userId: number,
    email: string,
    firstName: string,
    lastName: string,
    address: string,
    password: string,
    username: string,
    walletPrivateKey: string

  ) {
    this.userId = userId;
    this.id = userId;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.password = password;
    this.username = username;
    this.walletPrivateKey = walletPrivateKey;

  }
}
