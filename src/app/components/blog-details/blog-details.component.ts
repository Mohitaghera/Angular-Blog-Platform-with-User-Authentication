import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss'
})
export class BlogDetailsComponent implements OnInit {
  blog: any;

  constructor(private route: ActivatedRoute, private blogService: BlogService) {}

  ngOnInit() {
    const blogId = Number(this.route.snapshot.paramMap.get('id'));
    this.blogService.getBlogDetails(blogId)
      .subscribe((data:any) => {
        console.log(data.blog);
        
        this.blog = data.blog;
      });
  }
}

