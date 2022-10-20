export class Wallet {
  id: string;
  adress: string;
  privateKey: string;

  constructor(id: string, adress: string, privateKey: string) {
    this.id = id;
    this.adress = adress;
    this.privateKey = privateKey;
  }
}
