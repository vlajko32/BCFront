import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeOperatorComponent } from './components/operator/home-operator/home-operator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectionsComponent } from './components/selections/selections.component';
import { PlayersComponent } from './components/players/players.component';
import { ViewSelectionComponent } from './components/selections/view-selection/view-selection.component';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    HomeOperatorComponent,
    SelectionsComponent,
    PlayersComponent,
    ViewSelectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule
    
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
