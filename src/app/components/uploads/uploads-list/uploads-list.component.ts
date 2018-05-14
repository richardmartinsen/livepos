import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../../services/file-upload-service';
import { IUpload } from '../../../model/upload';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'uploads-list',
  templateUrl: './uploads-list.component.html'
})
export class UploadsListComponent implements OnInit {

  uploads: Observable<IUpload[]>;

  showSpinner = true;

  constructor(private uploadService: UploadService) { }

  ngOnInit() {
    this.uploads = this.uploadService.get({limitToLast: 5}, 'asddsd123123');
    this.uploads.subscribe(() => this.showSpinner = false);
  }

}
