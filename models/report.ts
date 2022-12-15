export class Report {
    id: number;
    passengerId: number;
    driverId: number;
    reason: string;

    constructor(id: number, passengerId: number, driverId: number, reason: string) {
      this.id = id;
      this.passengerId = passengerId;
      this.driverId = driverId;
      this.reason = reason;
    }
  }
