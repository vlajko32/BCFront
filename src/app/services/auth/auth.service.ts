import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  set role(value) {
    this._role = value;
  }
  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  private _authenticated = false;
  private _role;
  private _token: string;


  constructor() {
  }

  get authenticated(): boolean {
    return this._authenticated;
  }

  set authenticated(value) {
    this._authenticated = value;
  }

  get role(): string {
    return this._role;
  }

  
  reset() {
    this._role = 1;
    this._authenticated = false;
  }


}
