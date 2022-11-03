export class Wallet {
  id: string;
  address: string;
  walletPrivateKey: string;

  constructor(id: string, address: string, walletPrivateKey: string) {
    this.id = id;
    this.address = address;
    this.walletPrivateKey = walletPrivateKey;
  }
}
