import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelService } from 'src/app/dashboard/services/model.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/dashboard/services/product.service';
import { CategoryService } from 'src/app/dashboard/services/category.service';
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

  constructor(private categoryService: CategoryService, private modelService: ModelService,
              private router: Router, private productService: ProductService,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.createModelForm();
    this.route.params.subscribe(params => {
      this.param = params.id;
      this.getDetails(this.param);
    });
  }

  createModelForm() {
    this.productForm = this.fb.group({
      name: [ '', Validators.required],
      price: [ '', Validators.required],
      size: [ '', Validators.required],
      color: [ '', Validators.required],
      available: [ '', Validators.required],
      discount: [ '', Validators.required]
    });
  }

  getDetails(id) {
    this.categoryService.getAll().subscribe(c => {
      this.categories = c;
      this.productService.getById(id).subscribe(data => {
        this.selectedCategory = data.model.category.category_id;
        this.product = data;

        this.setForm(this.product);

        this.modelService.getByCategory(this.selectedCategory).subscribe( ctgry => {
          this.models = ctgry;
          this.selectedModel = data.model.model_id;
        });
      });
    });
}

setModel(categoryid) {
  this.modelService.getByCategory(categoryid).subscribe(data => {
    this.models = data;
    this.selectedModel = data[0].model_id;
  });
}

setForm(product) {
  this.productForm.get('name').setValue(product.name);
  this.productForm.get('price').setValue(product.price);
  this.productForm.get('size').setValue(product.size);
  this.productForm.get('color').setValue(product.color);
  this.productForm.get('available').setValue(product.available);
  this.productForm.get('discount').setValue(product.discount);
}

add() {
  const form = this.productForm.value;
  form.product_id = this.product.product_id;
  this.productService.create(form).subscribe(data => {
    this.product = data;
  });
}

}
