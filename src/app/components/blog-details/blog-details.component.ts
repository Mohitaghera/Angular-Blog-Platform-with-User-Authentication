import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss'
})
export class BlogDetailsComponent implements OnInit,OnDestroy {
  blog: any;
  isLoading :boolean = false;
  blogSub!:Subscription;


  constructor(private route: ActivatedRoute, private blogService: BlogService) {}

  ngOnInit() {
    this.isLoading = true;
    const blogId = Number(this.route.snapshot.paramMap.get('id'));
    this.blogSub =  this.blogService.getBlogDetails(blogId)
      .subscribe((data:any) => {
        console.log(data.blog);
        
        this.blog = data.blog;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
      this.blogSub.unsubscribe();
  }
}

