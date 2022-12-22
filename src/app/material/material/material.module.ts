import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import {MatListModule} from '@angular/material/list'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class MaterialModule { }
