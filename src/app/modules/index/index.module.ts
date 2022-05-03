import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { HttpClientModule } from '@angular/common/http';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgSelectModule } from '@ng-select/ng-select';
import { IdNumberPipe } from 'src/app/pipe/id-number.pipe';
@NgModule({
  declarations: [
    IndexComponent,
    IdNumberPipe
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
    GooglePlaceModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    NgSelectModule,
    RouterModule.forChild(
      [
        { path: '', component: IndexComponent }
      ]
    ),
  ]
})
export class IndexModule { }
