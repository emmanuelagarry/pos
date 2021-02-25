import { map, catchError, shareReplay, switchMap } from 'rxjs/operators'
import { AngularFirestore } from '@angular/fire/firestore'
import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { Observable } from 'rxjs'

interface Credential {
  credential: string
  phone: string
  name: string
}

@Injectable()
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private fireStore: AngularFirestore
  ) {}

  credential$: Observable<any> = this.auth.authState.pipe(
    switchMap(user => {
      return this.fireStore.doc<Credential>(`users/${user.uid}`).valueChanges()
    }),
    map(items => {
      return items
    }),
    shareReplay(),
    catchError(error => {
      console.error(error)
      return [null]
    })
  )

  checkAuthState$ = this.auth.authState.pipe()

  async signInWithEmailAndpassword({ email, password }) {
    try {
      const user = await this.auth.signInWithEmailAndPassword(email, password)
      return true
    } catch (error) {}
  }

  logoutUser() {
    this.auth.signOut()
  }

  checkForPromo(code: string) {
    return this.fireStore.doc<{ promo: string; percentage: number }>(
      `promotions/${code}`
    )
  }
}
