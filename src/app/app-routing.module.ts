import { PlayersComponent } from './components/players/players.component';
import { SelectionsComponent } from './components/selections/selections.component';
import { HomeOperatorComponent } from './components/operator/home-operator/home-operator.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewSelectionComponent } from './components/selections/view-selection/view-selection.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home-operator',
    component: HomeOperatorComponent
  },
  {
    path: 'selections',
    component: SelectionsComponent
  },
  {
    path: 'selections/:selectionID',
    component: ViewSelectionComponent
  },
  {
    path: 'players',
    component: PlayersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
