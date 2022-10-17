export abstract class User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  location: string;
  blocked: boolean;
  password: string;
  abstract profile: string;

  constructor(
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    location: string,
    password: string
  ) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.location = location;
    this.blocked = false;
    this.password = password;
  }
}
