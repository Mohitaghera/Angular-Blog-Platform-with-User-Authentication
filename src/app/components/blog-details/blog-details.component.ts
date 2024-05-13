import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

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


  constructor(private route: ActivatedRoute,private router:Router, private blogService: BlogService,private authService:AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    const blogId = Number(this.route.snapshot.paramMap.get('id'));
    this.blogSub =  this.blogService.getBlogDetails(blogId)
      .subscribe((data:any) => {
        
        this.blog = data.blog;
        this.isLoading = false;
      });
  }
  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
      this.blogSub.unsubscribe();
  }
}

