import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class BookService {
    constructor(private http: HttpClient) {}
    public getBookData(query: string): Observable<any> {
        return this.http.post(environment.apiUrl + 'book/query', {
            query,
        });
    }
}
