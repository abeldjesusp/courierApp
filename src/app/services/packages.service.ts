import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

// API ENDPOINT
import { ENDPOINT } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  constructor(private http: HttpClient) {
  }

  public getPackages(username: string): Observable<any> {
    return this.http.get(`${ENDPOINT}/packages/getPending?username=${username}`).pipe(
                map((resp: any) => {
                  if (resp.success) {
                    const packages = resp.responseObject;
                    return packages;
                  }
                  return null;
                }),
               );
  }
}
