import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../services/blog.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoaderComponent } from '../../loader/loader.component';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule,LoaderComponent],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss',
  providers: [BlogService],
})
export class BlogListComponent implements OnInit, OnDestroy {
  blogs: any[] = [];
  blogSub!: Subscription;
  isLoading: boolean = false;

  constructor(
    private blogService: BlogService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.blogSub = this.blogService.getBlogList().subscribe((data: any) => {
      this.blogs = data.blogs;
      this.isLoading = false;
    });
  }
  logout(): void {
    this.authService.logout();
  }

  onBlogDetail(blogId: number) {
    this.router.navigate(['/blog-list', blogId]);
  }

  ngOnDestroy(): void {
    this.blogSub.unsubscribe();
  }
}