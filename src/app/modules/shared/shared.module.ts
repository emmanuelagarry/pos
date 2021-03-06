import { DropzoneComponent } from './dropzone/dropzone.component'
import { DraganddropDirective } from 'src/app/directives/draganddrop/draganddrop.directive'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatTableModule } from '@angular/material/table'
import { TableComponent } from './../home/table/table.component'
import { IonicModule } from '@ionic/angular'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

@NgModule({
  declarations: [TableComponent, DropzoneComponent, DraganddropDirective],
  imports: [CommonModule, IonicModule, MatTableModule, MatProgressBarModule],

  exports: [TableComponent, DropzoneComponent],
})
export class SharedModule {}
