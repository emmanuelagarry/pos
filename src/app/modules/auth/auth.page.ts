import { SetlocationComponent } from './setlocation/setlocation.component'
import { MatDialog } from '@angular/material/dialog'
import { AuthService } from './../../services/auth/auth.service'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { Component, OnInit } from '@angular/core'
import { map } from 'rxjs/operators'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { SooyahBistroPouchDb } from 'src/app/pouchdb/pouchdb.sooyah-bistro'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  loginForm: FormGroup
  connection: boolean
  constructor(
    fb: FormBuilder,
    private auth: AuthService,
    public route: ActivatedRoute,
    private router: Router,
    private pouch: SooyahBistroPouchDb,
    public dialog: MatDialog
  ) {
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.min(6)]),
      ],
    })
  }

  hide: boolean
  selected = new FormControl(0)

  uuid$
  ngOnInit() {
    this.uuid$ = this.route.data
    // this.auth.checkAuthState$.pipe(
    //   map(state => {
    //     if (state) {
    //       this.selected.setValue(0)
    //     } else {
    //       this.selected.setValue(1)
    //     }
    //   })
    // )
  }

  async login(formdata) {
    this.connection = true

    try {
      const local = await this.pouch.checklocactionPouch()

      if (local) {
        const log = await this.auth.signInWithEmailAndpassword(formdata)
        if (log) {
          this.loginForm.reset()
          this.router.navigate(['/tab/pos'])
        }
      } else {
        const dialogRef = this.dialog.open(SetlocationComponent, {
          disableClose: true,
        })
        dialogRef.afterClosed().subscribe(async result => {
          const log = await this.auth.signInWithEmailAndpassword(formdata)
          if (log) {
            this.loginForm.reset()
            this.router.navigate(['/tab/pos'])
          }
        })
      }
    } catch (error) {
      alert(`${error.message}`)
    } finally {
      this.connection = false
    }
  }
}
