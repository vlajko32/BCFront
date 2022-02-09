import { TestGuard } from './services/guards/test.guard';
import { CoachGuardGuard } from './services/guards/coach-guard.guard';
import { TrainingsComponent } from './components/coach-pages/trainings/trainings.component';
import { MySelectionComponent } from './components/coach-pages/my-selection/my-selection.component';
import { HomeComponent } from './components/coach-pages/home/home.component';
import { CoachesComponent } from './components/coaches/coaches.component';
import { PlayersComponent } from './components/players/players.component';
import { SelectionsComponent } from './components/selections/selections.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
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
    component: LoginComponent,
  },
 

  {
    path: 'selections',
    component: SelectionsComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'selections/:selectionID',
    component: ViewSelectionComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'players',
    component: PlayersComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'coaches',
    component: CoachesComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'user-home',
    component:HomeComponent,
    canActivate: [CoachGuardGuard]
  },
  {
    path:'my-selection',
    component: MySelectionComponent,
    canActivate: [CoachGuardGuard]
  },
  {
    path:'trainings',
    component: TrainingsComponent,
    canActivate: [CoachGuardGuard]
  },
  {
    path: "**",
    redirectTo:"login",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
