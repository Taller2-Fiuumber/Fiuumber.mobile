export class Vehicle {
  id: number;
  brand: string;
  model: string;
  image: string;

  constructor(id: number, brand: string, model: string, image: string) {
    this.id = id;

    this.brand = brand;
    this.model = model;
    this.image = image;
  }
}
