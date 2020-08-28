import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { SessionService } from './session.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private ses: SessionService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.auth.isLoggedIn){
        return true
      }
      const session = localStorage.getItem('session');
      console.log(session);
      if (session){
        console.log("about to hit session");
        return this.ses.isLoggedIn(session).pipe(map((data)=>{
          if (!data[0].message){
            localStorage.setItem('session', data[0].session);
            localStorage.setItem('user_state', JSON.stringify(data[0]));
            return true;
          }else{
            localStorage.clear()
            return false
          }
        }));
      }
      localStorage.clear()
      return false
  }

}
