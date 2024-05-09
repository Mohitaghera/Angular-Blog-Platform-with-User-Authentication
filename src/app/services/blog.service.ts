import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private blogListUrl =
    'https://api.slingacademy.com/v1/sample-data/blog-posts/';

  constructor(private http: HttpClient) {}

  getBlogList(): Observable<any[]> {
    return this.http.get<any[]>(this.blogListUrl);
  }

  getBlogDetails(blogId: number): Observable<any> {
    
    return this.http
      .get<any>(`${this.blogListUrl}${blogId}
    `);
  }
}
