export interface Trip {
  
  _id: string;
  passengerId: string; // En postgresql son numbers
  driverId: string | undefined; // En postgresql son numbers
  fromLatitude: number;
  fromLongitude: number;
  toLatitude: number;
  toLongitude: number;
  start: Date | undefined;
  finish: Date | undefined;
  subscription: any;
  status: string;
  finalPrice: number;
}
