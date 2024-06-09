import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { MovieListComponent } from './movie-list/movie-list.component';
import { AddMovieComponent } from './modal/add-movie/add-movie.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../shared/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../shared/common/header/header.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MovieUserComponent } from './movie-user/movie-user.component';
import { RatingModule } from 'ng-starrating';

@NgModule({
  declarations: [
    MovieListComponent,
    AddMovieComponent,
    HeaderComponent,
    MovieUserComponent
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    RatingModule
  ],
  providers:[
    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MovieModule { }
