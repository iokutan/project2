import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsService } from '../../services/news.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  newsForm: FormGroup;

  constructor(private newsService: NewsService,
              private fb: FormBuilder) { }

  createNewsForm() {
    this.newsForm = this.fb.group({
    titel: ['', Validators.required],
    description: ['', Validators.required],
    date: ['', Validators.required],
    category: ['', Validators.required],
    image: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.createNewsForm();
  }

  add() {
    if (this.newsForm.valid) {

    }
  }
}
