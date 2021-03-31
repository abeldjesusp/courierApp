import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

// API ENDPOINT
import { ENDPOINT } from '../config/config';

// MODELS
import { UserModel } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: UserModel;

  constructor(private http: HttpClient) {
  }

  public login(userCredential: { username: string, password: string }): Observable <any> {
    return this.http.post(`${ENDPOINT}/membership/login`, userCredential).pipe(
      map((resp: any) => {
        
        if (resp.success) {
          let userTemp: UserModel;
          userTemp = {
            ...resp.responseObject,
            username: userCredential.username
          };

          this.setCurrentSession(userTemp);
        }
        
        return resp;
      })
    );
  }

  public logout(): void {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('expireDate');
    sessionStorage.clear();
  }

  private setCurrentSession(currentUser: UserModel): void {
    this.user = currentUser;
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));

    const today = new Date();
    today.setSeconds(5 * 3600); // add 5 hours to the date taken at that time
    sessionStorage.setItem('expireDate', today.getTime().toString());
  }

  public getUser(): UserModel {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    return user;
  }

  public isAutenticated(): boolean {
    //if (this.user) {
    //  return false;
    //}

    const expira = Number(sessionStorage.getItem('expireDate'));
    const expiraDate = new Date();

    expiraDate.setTime(expira);

    if (expiraDate > new Date()) {
      return true;
    } else {
      sessionStorage.removeItem('currentUser');
      return false;
    }
  }
}
