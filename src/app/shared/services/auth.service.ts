import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Endpoint } from '@shared/enums/endpoint.enum';
import { ILogin } from '@shared/interfaces/login/login.interface';
import { IUser } from '@shared/interfaces/user/user.interface';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  public isLoggedIn$ = new BehaviorSubject<boolean>(false);
  public user$ = new BehaviorSubject<IUser | null>(null);

  constructor(private http: HttpClient) {
  }

  public getUser(userId: string): Observable<IUser | null> {
    const url = `${environment.baseUrl}${ Endpoint.users }`;

    return this.http.get<IUser[]>(url).pipe(
      map((users: IUser[]): IUser | null => {
        const user = users.find((user: IUser) => user.userId === userId);

        if (!user) return null;

        return user;
      }),
    );
  }

  public login(data: ILogin): Observable<IUser | null> {
    const url = `${environment.baseUrl}${ Endpoint.users }`;

    return this.http.get<IUser[]>(url).pipe(
      map((users: IUser[]): IUser | null => {
        const user = users.find((user: IUser) => user.email === data.email && user.password == data.password);

        if (!user) return null;

        localStorage.setItem('token', user.userId);

        return user;
      }),
    );
  }
}
