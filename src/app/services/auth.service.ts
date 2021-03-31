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
    let failedAttempts = this.getFailedAttempts();
    
    /* Only attempt login if user has less than 3 login attempts */
    if (failedAttempts < 3) {
      return this.http.post(`${ENDPOINT}/membership/login`, userCredential).pipe(
        map((resp: any) => { // Map server response
          if (resp.success) { // if response is true
            let userTemp: UserModel;
            userTemp = { // create the user
              ...resp.responseObject,
              username: userCredential.username
            };

            this.setCurrentSession(userTemp); // create a new session
            this.removeFailedAttempts();
            this.removeBlockDate();
          } else {
            failedAttempts++; // increment failed attempts
            if(failedAttempts === 3) { // if failed attempts is equal to 3 block login for 1 hour
              this.setBlockDate();
            } else {
              this.setFailedAttempts(failedAttempts); // set failed attempts in session
            }
          }
          return resp;
        })
      );
    }

    return null;
  }

  public logout(): void {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('expireDate');
    sessionStorage.clear();
  }

  // Set current session
  private setCurrentSession(currentUser: UserModel): void {
    this.user = currentUser;
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));

    const today = new Date();
    today.setSeconds(5 * 3600); // add 5 hours to the date taken at that time
    sessionStorage.setItem('expireDate', today.getTime().toString());
  }

  // Get user data from sessionstorage
  public getUser(): UserModel {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    return user;
  }

  // verify if the user is autenticated
  public isAutenticated(): boolean {
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

  // Set failed attempts in the session
  public setFailedAttempts(attempts: number): void {
    sessionStorage.setItem('failedAttempts', JSON.stringify(attempts));
  }

  // Set failed attempts in the session
  public getFailedAttempts(): number {
    const attempts = JSON.parse(sessionStorage.getItem('failedAttempts'));
    return attempts;
  }

  // remove failed attempts in the session
  public removeFailedAttempts(): void {
    sessionStorage.removeItem('failedAttempts');
  }

  // Set block date in the session
  public setBlockDate(): void {
    const today = new Date();
    today.setSeconds(1 * 3600); // add 1 hour to the date taken at that time
    sessionStorage.setItem('blockDate', today.getTime().toString());
    this.removeFailedAttempts();
  }

  // get block date in session
  public getBlockDate(): number {
    const blockDate = Number(sessionStorage.getItem('blockDate'));
    return blockDate;
  }

  // remove block date in session
  public removeBlockDate(): void {
    sessionStorage.removeItem('blockDate');
  }

  // to verify the date to be blocked the user
  public blockedUser(): boolean {
    const blockDate = new Date();

    blockDate.setTime(this.getBlockDate());

    if (blockDate > new Date()) {
      return true;
    } else {
      return false;
    }
  }
}
