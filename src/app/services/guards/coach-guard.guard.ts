import { CoachService } from 'src/app/services/coaches/coach.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoachGuardGuard implements CanActivate {

  constructor(private router: Router, private coachService: CoachService){
    
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem('role')!='Coach')
      {
        this.router.navigateByUrl('/selections');
        return false;
      }
     
    return true;
  }
  
}
