import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArtikelCategoryService } from 'src/app/dashboard/services/artikel-category.service';

@Component({
  selector: 'cristal-artikel-category-new',
  templateUrl: './artikel-category-new.component.html',
  styleUrls: ['./artikel-category-new.component.css']
})
export class ArtikelCategoryNewComponent implements OnInit {
  artikelCategoryForm: FormGroup;
  constructor(private ArtikelCategoryService: ArtikelCategoryService,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.createOrderForm();
  }

  createOrderForm() {
    this.artikelCategoryForm = this.fb.group({
      category_name: [ '', Validators.required]
    });
  }

  add(){
    const form = this.artikelCategoryForm.value;
    this.ArtikelCategoryService.create(form).subscribe(data => {
    })
  }

}
