export interface Car {
  id: number;
  name: string;
  color: string;
}
export interface NewCar {
  name: string;
  color: string;
}
export interface CarResponse {
  data: Car;
}

export interface CarsResponse {
  data: Car[];
}
