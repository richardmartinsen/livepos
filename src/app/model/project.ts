
export interface IProject {
  $key?: string;
  id: string;
  title: string;
  address: string;
  attendancePlace: string;
  attendanceTime: string;
  start: string;
  end: string;
  sign: string;
  tramCourse: string;
  responsible: string;
  car: string[];
  staff: string[];
  customer: string;
  description: string;
  released: boolean;
  notificationMessage: string;
  numberStaff: number;
  holiday: boolean;
}

export class Project implements IProject {
  title = '';
  id: string;
  address = '';
  attendancePlace = '';
  attendanceTime = '';
  start = '';
  end = '';
  sign = '';
  tramCourse = '';
  responsible = '';
  car = [];
  staff = [];
  customer = '';
  description = '';
  released = false;
  notificationMessage = 'Aldri';
  numberStaff = 0;
  holiday = false;
}
