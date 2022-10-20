export interface Trip {
  
  id: string;
  passengerId: string; // En postgresql son numbers
  driverId: string; // En postgresql son numbers
  fromLatitude: number;
  fromLongitude: number;
  toLatitude: number;
  toLongitude: number;
  start: Date;
  finish: Date;
  subscription: any;
  status: string;
  finalPrice: number;
}
