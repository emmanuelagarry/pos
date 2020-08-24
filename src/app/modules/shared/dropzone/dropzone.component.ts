import { NgfirestoreService } from './../../../services/firestore/ngfirestore.service'
import {
  Component,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core'
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage'
import { Observable, Subscription, BehaviorSubject, iif, of } from 'rxjs'
import { finalize, switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss'],
})
export class DropzoneComponent {
  @Output() fileUrl = new EventEmitter<string>()

  private task: AngularFireUploadTask
  start$ = new BehaviorSubject(false)
  uploadPercent$: Observable<number> = this.start$.pipe(
    switchMap(start =>
      iif(() => start, this.task ? this.task.percentageChanges() : of(1), of(0))
    )
  )
  downloadURL$: Observable<string>
  uploadSnapshot$: Observable<any>

  subs: Subscription
  constructor(
    private storage: AngularFireStorage,
    private fs: NgfirestoreService
  ) {}
  uploadFile(event) {
    const picture = event.item(0)
    if (picture.type.split('/')[0] !== 'image') {
      alert('this is not an image file')
      return
    }

    const path = `images/${JSON.stringify(new Date().getTime())}`

    const customMetadata = { app: 'sooyah-bistro' }
    const fileRef = this.storage.ref(path)

    this.task = this.storage.upload(path, picture, { customMetadata })

    this.uploadSnapshot$ = this.task.snapshotChanges()
    this.start$.next(true)
    this.subs = this.uploadSnapshot$
      .pipe(
        finalize(async () => {
          const fileLink = await fileRef.getDownloadURL().toPromise()
          this.fileUrl.emit(fileLink)
          this.fs.addImageToCollection(fileLink, path)
        })
      )
      .subscribe()
  }

  ionViewDidLeave() {
    if (this.subs) {
      this.subs.unsubscribe()
    }
  }
}
