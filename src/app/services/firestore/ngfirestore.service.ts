import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable()
export class NgfirestoreService {
  constructor(private firestore: AngularFirestore) {}

  addImageToCollection(imageUrl: string, path: string) {
    this.firestore
      .collection('images')
      .add({ imageUrl, path })
      .catch(e => {
        console.log(e)
      })
  }
}
