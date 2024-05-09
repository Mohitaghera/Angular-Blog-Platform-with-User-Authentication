import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../services/blog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent implements OnInit, OnDestroy {
  blogs: any[] = [];
  blogSub!:Subscription;

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.blogSub = this.blogService.getBlogList()
      .subscribe((data: any)=> {
        console.log(data.blogs);

        this.blogs = data.blogs;
      });
    
    
  }

  ngOnDestroy(): void {
      this.blogSub.unsubscribe();
  }
}