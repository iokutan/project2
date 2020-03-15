import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelService } from 'src/app/dashboard/services/model.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/dashboard/services/product.service';
import { CategoryService } from 'src/app/dashboard/services/category.service';
import { NotificationService } from 'src/app/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {

  param: any;
  productForm: FormGroup;
  product: any;
  categories: any[];
  models: any[];
  selectedModel: any;
  selectedCategory: any;

  constructor(private categoryService: CategoryService,
              private modelService: ModelService,
              private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.createModelForm();
    this.getDetails();
  }

  createModelForm() {
    this.productForm = this.fb.group({
      name: [ '', Validators.required],
      price: [ '', Validators.required],
      size: [ '', Validators.required],
      color: [ '', Validators.required],
      available: [ '', Validators.required],
      discount: [ '', Validators.required],
      imageUrl: [ '', Validators.required],
      currentCategory: [ '', Validators.required],
      category_id: [ '', Validators.required]
    });
  }

  setImageUrl(imageUrl) {
    this.productForm.get('imageUrl').setValue(imageUrl);
  }

  getDetails() {
    this.categoryService.getAll().subscribe(c => {
      this.categories = c;
      this.modelService.getByCategory(this.selectedCategory).subscribe( mdls => {
        this.models = mdls;
      });
    });
  }

  setModel() {
    const categoryId = this.productForm.get('currentCategory').value;
    this.modelService.getByCategory(categoryId).subscribe(data => {
      this.models = data;
      this.selectedModel = data[0].model_id;
    });
  }

  add() {
    const form = this.productForm.value;
    form.imageUrl = this.productForm.get('imageUrl').value;
    this.productService.create(form).subscribe(data => {
      this.notificationService.success('New product added!');
      this.product = data;
      this.router.navigate(['/dashboard', 'products', 'product-list']);
    },
    (response: HttpErrorResponse) => { 
      this.notificationService.error(`Product could not be added! ${response.error}`); });
  };
  }
