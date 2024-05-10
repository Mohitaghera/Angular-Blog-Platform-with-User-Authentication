import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../services/blog.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss',
  providers:[BlogService]

})
export class BlogListComponent implements OnInit, OnDestroy {
  blogs: any[] = [];
  blogSub!:Subscription;
  isLoading :boolean = false;

  constructor(private blogService: BlogService, private router : Router) {}

  ngOnInit() {
    this.isLoading = true;
    this.blogSub = this.blogService.getBlogList()
      .subscribe((data: any)=> {
        console.log(data.blogs);

        this.blogs = data.blogs;
        this.isLoading = false;
      });
    
    
  }
  onBlogDetail(blogId: number) {
    this.router.navigate(['/blog-list', blogId]);
  }

  ngOnDestroy(): void {
      this.blogSub.unsubscribe();
  }
}