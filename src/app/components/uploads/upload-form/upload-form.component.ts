import {Component, Input} from '@angular/core';
import { UploadService } from '../../../services/file-upload-service';
import {IUpload, Upload} from '../../../model/upload';
import * as _ from 'lodash';

@Component({
  selector: 'upload-form',
  templateUrl: './upload-form.component.html'
})
export class UploadFormComponent {

  @Input() projectName: String;

  selectedFiles: FileList;

  currentUpload: IUpload;

  constructor(private uploadService: UploadService) { }

  detectFiles(event) {
      this.selectedFiles = event.target.files;
  }

  uploadFiles() {
    const files = this.selectedFiles;
    const filesIndex = _.range(files.length);
    _.each(filesIndex, (idx) => {
      this.currentUpload = new Upload(files[idx], this.projectName);
      this.uploadService.push(this.currentUpload); }
    );
  }

}
