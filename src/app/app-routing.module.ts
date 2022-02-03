import { TrainingsComponent } from './components/coach-pages/trainings/trainings.component';
import { MySelectionComponent } from './components/coach-pages/my-selection/my-selection.component';
import { HomeComponent } from './components/coach-pages/home/home.component';
import { CoachesComponent } from './components/coaches/coaches.component';
import { PlayersComponent } from './components/players/players.component';
import { SelectionsComponent } from './components/selections/selections.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewSelectionComponent } from './components/selections/view-selection/view-selection.component';
import { AdminGuard } from './services/guards/admin.guard';

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
    path: 'selections',
    component: SelectionsComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'selections/:selectionID',
    component: ViewSelectionComponent
  },
  {
    path: 'players',
    component: PlayersComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'coaches',
    component: CoachesComponent
  },
  {
    path: 'user-home',
    component:HomeComponent
  },
  {
    path:'my-selection',
    component: MySelectionComponent
  },
  {
    path:'trainings',
    component: TrainingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
