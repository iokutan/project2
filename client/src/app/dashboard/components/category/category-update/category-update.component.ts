import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/dashboard/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'cristal-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit {
  param: any;
  categoryForm: FormGroup;
  category: any; 

  constructor(private categoryService: CategoryService,
              private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.param = params['id'];
      this.getCategoryDetails();
    });
    this.createCategoryForm();
  }

  getCategoryDetails(){
    this.categoryService.getById(this.param).subscribe(data => {
      this.category = data;
      this.categoryForm.get('category_name').setValue(this.category.category_name)
    });
  }

  createCategoryForm() {
    this.categoryForm = this.fb.group({
      category_name: [ '', Validators.required]
    });
  }

  update(){
    const categoryName = this.categoryForm.get('category_name').value;
    this.category.category_name = categoryName;
    this.categoryService.update(this.category)
    .subscribe(
      (data) => {
        this.notificationService.success('Category updated!');
      this.getCategoryDetails();
      this.router.navigate(['/dashboard','products','category-list']);
    },
    (response: HttpErrorResponse) => { 
      this.notificationService.error(`Product could not be updated! ${response.error}`); });
  }

  delete(){
    this.categoryService.delete(this.category.category_id)
    .subscribe(
      (data) => {
        this.notificationService.success('Category deleted!');
        this.router.navigate(['/dashboard','products','category-list']);
    },
    (response: HttpErrorResponse) => { 
      this.notificationService.error(`Category could not be deleted! ${response.error}`); });
  }
}
