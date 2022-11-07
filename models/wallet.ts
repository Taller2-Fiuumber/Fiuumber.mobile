export class Wallet {
  id: number;
  address: string;
  walletPrivateKey: string;

  constructor(id: number, address: string, walletPrivateKey: string) {
    this.id = id;
    this.address = address;
    this.walletPrivateKey = walletPrivateKey;
  }
}
