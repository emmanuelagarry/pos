import { Component, OnInit, Input, ContentChild, TemplateRef } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { Dish } from 'src/app/models/dish.model';
import { map } from 'rxjs/operators';


export class TableDataSource extends DataSource<any> {

  constructor(private obserbavaleData) {
    super();
  }

  connect() {
    return this.obserbavaleData;
  }
  disconnect() {

  }

  observableLength() {
    // return this.obserbavaleData.pipe(map(data => data.length));
  }


}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableComponent implements OnInit {

  @Input() source;
  @Input() tableColumn: string[];
  dataSource;
  expandedElement: Dish[] | null;



  @ContentChild('optionTemplate', { static: false })
  optionTemplateRef: TemplateRef<any>;
  constructor() {


   }

  ngOnInit() {
    this.dataSource = new TableDataSource(this.source);
  }

}
