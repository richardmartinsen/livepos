import { Component, Input } from '@angular/core';
import { UploadService } from '../../../services/file-upload-service';
import { Upload } from '../../../model/upload';

@Component({
  selector: 'upload-detail',
  templateUrl: './upload-detail.component.html'
})
export class UploadDetailComponent {

  @Input() upload: Upload;

  constructor(public uploadService: UploadService) { }

}
