import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user = localStorage.getItem('userID');
  role = localStorage.getItem('role');
  constructor( private router: Router) { }

  ngOnInit(): void {
  }
  
  onLogOut(){
    console.log("Oprem");
    localStorage.clear();
    this.router.navigateByUrl('/login');

  }
}
