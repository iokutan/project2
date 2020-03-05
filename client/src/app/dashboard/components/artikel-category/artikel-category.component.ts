import { Component, OnInit } from '@angular/core';
import { ArtikelCategoryService } from '../../services/artikel-category.service';

@Component({
  selector: 'cristal-artikel-category',
  templateUrl: './artikel-category.component.html',
  styleUrls: ['./artikel-category.component.css']
})
export class ArtikelCategoryComponent implements OnInit {
  
  categories: any [];

  constructor(private categoryService: ArtikelCategoryService) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    })
  }

}
