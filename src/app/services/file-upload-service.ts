import { Injectable } from '@angular/core';
import { IUpload } from '../model/upload';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

@Injectable()
export class UploadService {

  private static basePath = '/uploads';

  uploads: Observable<IUpload[]>;

  constructor(private db: AngularFireDatabase) { }

  public get(query= {}, projectName: String): Observable<IUpload[]> {
    this.uploads = this.db.list(UploadService.basePath, { query: query})
      .map(function (uploads1) {
      return uploads1.filter(function (upload) {
        return upload.projectName === projectName;
      })
    });

    return this.uploads;
  }

  public remove(upload: IUpload) {
    this.deleteFileData(upload.$key)
    .then( () => {
      UploadService.deleteFileStorage(upload.name);
    })
    .catch(error => console.error(error));
  }

  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  public push(upload: IUpload) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${UploadService.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        let snap = snapshot as firebase.storage.UploadTaskSnapshot
        upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100;
      },
      (error) => {
        // upload failed
        console.error(error);
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        this.saveFileData(upload);
        return undefined
      }
    );
  }

  // Writes the file details to the realtime db
  private saveFileData(upload: IUpload) {
    this.db.list(`${UploadService.basePath}/`).push(upload);
  }

  // Writes the file details to the realtime db
  private deleteFileData(key: string) {
    return this.db.list(`${UploadService.basePath}/`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private static deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${UploadService.basePath}/${name}`).delete();
  }

}
