import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FileService {
    private apiUrl = '/api/auth'; 

    constructor(private http: HttpClient) {}

    uploadFile(fileData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload/`, fileData);
    }

    downloadFile(userUrl: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download/${userUrl}`, { responseType: 'blob' });
    }
}
