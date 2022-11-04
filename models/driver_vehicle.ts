import { Vehicle } from "./vehicle";

export class DriverVehicle {
  id: number;
  domain: string;
  modelYear: string;
  colorName: string;
  vehicle: Vehicle;

  constructor(
    id: number,
    domain: string,
    modelYear: string,
    colorName: string,
    vehicle: Vehicle
  ) {
    this.id = id;
    this.domain = domain;
    this.modelYear = modelYear;
    this.colorName = colorName;
    this.vehicle = vehicle;
  }
}
