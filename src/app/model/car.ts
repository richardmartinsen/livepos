
export interface ICar {
  $key?: string;
  licence: string;
  brand: string;
  lat: number;
  long: number;
}

export class Car implements ICar {
  licence = '';
  brand = '';
  lat: 0.0;
  long: 0.0;
}
