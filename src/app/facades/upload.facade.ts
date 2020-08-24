import { Observable, BehaviorSubject, of } from 'rxjs';
import { AngularFireUploadTask } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import { ProductsService } from '../services/products/products.service';
import { finalize, map, tap } from 'rxjs/operators';

@Injectable()
export class UploadFacade {

    // private percentageState$ = new BehaviorSubject<number>(null);
    // percentageStore$ = this.percentageState$.asObservable();
    private task: AngularFireUploadTask;
    private task2;
    percentage$: Observable<number>;
    private snapshot$: Observable<any>;
    private downloadUrl: Observable<string>;
    uploadState: Observable<any>;
    constructor(private product: ProductsService) {
        this.task = {
            cancel: null,
            pause: null,
            percentageChanges: () => of(0),
            catch: null,
            resume: null,
            snapshotChanges: () => of(null),
            task: null,
            then: null
        };
        this.percentage$ = this.task.percentageChanges();
        this.snapshot$ = this.task.snapshotChanges();
    }

    async startUploadPicture(event: FileList) {
        const picture = event.item(0);
        if (picture.type.split('/')[0] !== 'image') {
            alert('this is not an image file');
            return;
        }

        const path = `sooyah${new Date().getTime()}_${picture.name}`;
        const customMetaData = { app: 'sooyah-bistro' };
        const fileRef = this.product.uploadRef(path);
        // this.task2 = this.product.upload(path, picture, customMetaData);
        this.task = this.product.upload(path, picture, customMetaData);
        //     .then(item => console.log(item.task     ));
        // this.percentage$ = this.task2.percentageChanges();
        // this.snapshot$ = this.task.snapshotChanges()
        //     .pipe(
        //         tap(stuff => console.log(stuff)),
        //         finalize(() => this.downloadUrl = fileRef.getDownloadURL()));

    }

}

