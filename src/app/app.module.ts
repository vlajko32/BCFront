import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectionsComponent } from './components/selections/selections.component';
import { PlayersComponent } from './components/players/players.component';
import { ViewSelectionComponent } from './components/selections/view-selection/view-selection.component';
import {MatTableModule} from '@angular/material/table';
import { CoachesComponent } from './components/coaches/coaches.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { HomeComponent } from './components/coach-pages/home/home.component';
import { MySelectionComponent } from './components/coach-pages/my-selection/my-selection.component';
import { TrainingsComponent } from './components/coach-pages/trainings/trainings.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    SelectionsComponent,
    PlayersComponent,
    ViewSelectionComponent,
    CoachesComponent,
    HomeComponent,
    MySelectionComponent,
    TrainingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatTabsModule,
    MatIconModule,
    MatButtonToggleModule,
    
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
