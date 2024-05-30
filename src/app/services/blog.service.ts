import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private blogListUrl =
    'https://api.slingacademy.com/v1/sample-data/blog-posts/';

  constructor(private http: HttpClient) {}

  getBlogList(): Observable<any[]> {
    return this.http.get<any[]>(this.blogListUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError('Failed to fetch blog list. ' + error.message);
      })
    );
  }

  getBlogDetails(blogId: number): Observable<any> {
    const url = `${this.blogListUrl}${blogId}`;
    return this.http.get<any>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError('Failed to fetch blog details. ' + error.message);
      })
    );
  }
}
