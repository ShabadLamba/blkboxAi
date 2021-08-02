import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { VideosComponent } from './components/videos/videos.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: 'home', // child route path
        component: HomeComponent, // child route component that the router renders
      },
      {
        path: 'videos',
        component: VideosComponent, // another child route component that the router renders
      },
    ],
  },
  { path: '', redirectTo: 'main', pathMatch: 'full' }, // to redirect to main page if user doesn't enter the correct url
  { path: '**', component: MainComponent }, // wildcard route for when page is not found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
