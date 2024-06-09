import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieUserComponent } from './movie-user/movie-user.component';

const routes: Routes = [
  {path: '', component: MovieListComponent},
  {path: 'movie',component: MovieUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
