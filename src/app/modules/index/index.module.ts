import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    NgxSkeletonLoaderModule,
    NgxIntlTelInputModule,
    RouterModule.forChild(
      [
        { path: '', component: IndexComponent }
      ]
    ),
  ]
})
export class IndexModule { }
