import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TravelSearchComponent } from './views/travel-search/travel-search.component';

const routes: Routes = [{
  path: "home", component: TravelSearchComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
