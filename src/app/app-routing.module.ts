import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',  loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  { path: 'movie', loadChildren: () => import('./movie/movie.module').then(m => m.MovieModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
