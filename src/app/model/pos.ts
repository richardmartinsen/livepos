
export interface IPos {
  $key?: string;
  email: string;
  lat: number;
  long: number;
}

export class Pos implements IPos {
  email = '';
  lat: 0.0;
  long: 0.0;
}
