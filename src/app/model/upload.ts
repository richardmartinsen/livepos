
export interface IUpload {
  $key?: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  projectName: String;
  createdAt: Date;
}

export class Upload implements IUpload {
  file: File;
  name: string;
  url: string;
  progress: number;
  projectName: String;
  createdAt: Date = new Date();

  constructor(file: File, projectName: String) {
    this.file = file;
    this.projectName = projectName;
  }
}
