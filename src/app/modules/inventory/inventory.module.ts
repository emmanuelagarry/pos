import { DelaydialogComponent } from './delaydialog/delaydialog.component'
import { StackComponent } from './sellerinv/stack/stack.component'
import { CreatecategoryComponent } from './category/createcategory/createcategory.component'
import { CategoryComponent } from './category/category.component'
import { EditstockComponent } from './inventoryItem/editstock/editstock.component'
import { SharedModule } from './../shared/shared.module'
import { DishdialogComponent } from './dishdialog/dishdialog.component'
import { CreatedialogComponent } from './createdialog/createdialog.component'
import { MenuItemComponent } from './menuItem/menu.item.component'
import { InventoryItemComponent } from './inventoryItem/inventory.item.component'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'

import { IonicModule } from '@ionic/angular'

import { InventoryPage } from './inventory.page'

import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatChipsModule } from '@angular/material/chips'
import { MatRippleModule } from '@angular/material/core'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSelectModule } from '@angular/material/select'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatStepperModule } from '@angular/material/stepper'
import { MatTabsModule } from '@angular/material/tabs'
import { MatToolbarModule } from '@angular/material/toolbar'

import { DragDropModule } from '@angular/cdk/drag-drop'
import { SellerinvComponent } from './sellerinv/sellerinv.component'

const routes: Routes = [
  {
    path: '',
    component: InventoryPage,
  },
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatTabsModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatChipsModule,
    MatListModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DragDropModule,
    MatGridListModule,
    MatRippleModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    InventoryPage,
    InventoryItemComponent,
    MenuItemComponent,
    CreatedialogComponent,
    DishdialogComponent,
    EditstockComponent,
    CategoryComponent,
    CreatecategoryComponent,
    SellerinvComponent,
    StackComponent,
    DelaydialogComponent,
  ],
  entryComponents: [
    CreatedialogComponent,
    DishdialogComponent,
    EditstockComponent,
    StackComponent,
    DelaydialogComponent,
  ],
})
export class InventoryPageModule {}
