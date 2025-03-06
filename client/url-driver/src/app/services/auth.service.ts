import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = '/api';

    constructor(private http: HttpClient) {}

    signup(userData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/signup/`, userData);
    }

    login(credentials: any): Observable<any> {
        console.log('Enviando POST para: ', `${this.apiUrl}/login/}`)
        return this.http.post(`${this.apiUrl}/login/`, credentials);
    }
}

