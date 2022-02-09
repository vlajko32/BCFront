import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestGuard implements CanLoad {
  constructor(private route: Router){}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem('role')=='Operator')
      {
        this.route.navigateByUrl('/selections');
        return false;
      }
      if(localStorage.getItem('role')=='Coach')
      {
        this.route.navigateByUrl('/user-home');
        return false;
      }
      return true;
  }
}
