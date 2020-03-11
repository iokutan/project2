import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/dashboard/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cristal-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css']
})
export class CategoryNewComponent implements OnInit {
  categoryForm: FormGroup;
  constructor(private categoryService: CategoryService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.createOrderForm();
  }

  createOrderForm() {
    this.categoryForm = this.fb.group({
      category_name: [ '', Validators.required]
    });
  }

  add(){
    const form = this.categoryForm.value;
    this.categoryService.create(form).subscribe(data => {
    })
  }
}
