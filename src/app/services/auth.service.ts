import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

// API ENDPOINT
import { ENDPOINT } from '../config/config';
import { UserModel } from '../models/user.model';

// MODELS


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public tokenId: string;

  constructor(private http: HttpClient) {
    console.log(`${ENDPOINT}/membership/login`);
    
  }

  public login(userCredential: { username: string, password: string }): Observable <any> {
    console.log(userCredential);
    
    return this.http.post(`${ENDPOINT}/membership/login`, userCredential).pipe(
      map((resp: any) => {
        console.log(resp);
        
       /*  if (resp.success) {
          let user: UserModel;
          user = {
            ...resp.responseObject,
            username: userCredential.username
          };

          this.setCurrentSession(user);
        } */
        
        return resp;
      })
    );
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('expireDate');
    localStorage.clear();
  }

  private setCurrentSession(currentUser: UserModel): void {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    const today = new Date();
    today.setSeconds(5 * 3600); // add 5 hours to the date taken at that time
    localStorage.setItem('expireDate', today.getTime().toString());
  }

  public getUser() {
    if (this.tokenId) {
      const user = localStorage.getItem('currentUser');
      return user;
    } else {
      return null;
    }
  }
}
