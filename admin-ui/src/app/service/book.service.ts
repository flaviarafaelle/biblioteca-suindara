import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../api/book';
import { Category } from '../api/category';

@Injectable({
    providedIn: 'root',
})
export class BookService {
    constructor(private http: HttpClient) {}
    public queryAPIBooks(query: string): Observable<any> {
        return this.http.post(environment.apiUrl + 'book/query', {
            query,
        });
    }
    public getBooks(): Observable<Array<Book>> {
        return this.http.get<Array<Book>>(
            environment.apiUrl + 'book',
            {}
        );
    }
    public getCategories(): Observable<Array<Category>> {
        return this.http.get<Array<Category>>(
            environment.apiUrl + 'category',
            {}
        );
    }
}
