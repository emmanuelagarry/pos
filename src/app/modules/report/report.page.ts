import { Observable } from 'rxjs'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { PouchFacade } from 'src/app/facades/facade.pouch'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  dataSourceLocalOrders: Observable<any>
  dataSourceLocalExpense: Observable<any>
  tableColumnLocalOrders: string[] = [
    'timestamp',
    'price',
    'payment',
    'delivery',
  ]
  tableColumnLocalExpense: string[] = ['date', 'name', 'type', 'amount']
  constructor(
    private pouchFacade: PouchFacade,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'food',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/foodb.svg')
    )
    this.dataSourceLocalOrders = this.pouchFacade.order$
    this.dataSourceLocalExpense = this.pouchFacade.expenses$
  }

  ngOnInit() {}
}
