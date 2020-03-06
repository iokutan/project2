import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelService } from 'src/app/dashboard/services/model.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/dashboard/services/product.service';
import { CategoryService } from 'src/app/dashboard/services/category.service';

@Component({
  selector: 'cristal-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  param: any;
  productForm: FormGroup;
  product: any;
  categories: any[];
  models: any[];
  selectedModel: any;
  selectedCategory: any;

  constructor(private categoryService: CategoryService,
              private modelService: ModelService,
              private router: Router,
              private productService: ProductService,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.createModelForm();
    this.route.params.subscribe(params => {
      this.param = params.id;
      this.getDetails(this.param);
    });
  }

  getDetails(id) {

      this.categoryService.getAll().subscribe(c => {
        this.categories = c;
        this.productService.getById(id).subscribe(data => {
          this.selectedCategory = data.model.category.category_id;
          this.product = data;

          this.setForm(this.product);

          this.modelService.getByCategory(this.selectedCategory).subscribe(c => {
            this.models = c;
            this.selectedModel = data.model.model_id;
          });
        });
      });
  }

  setForm(product) {
    this.productForm.get('name').setValue(product.name);
    this.productForm.get('price').setValue(product.price);
    this.productForm.get('size').setValue(product.size);
    this.productForm.get('color').setValue(product.color);
    this.productForm.get('available').setValue(product.available);
    this.productForm.get('discount').setValue(product.discount);
    this.productForm.get('imageUrl').setValue(product.imageUrl);
  }

  setModel(categoryid) {
    this.modelService.getByCategory(categoryid).subscribe(data => {
      this.models = data;
      this.selectedModel = data[0].model_id;
    });
  }

  setImageUrl(imageUrl){
    this.productForm.get('imageUrl').setValue(imageUrl);
  }

  createModelForm() {
    this.productForm = this.fb.group({
      name: [ '', Validators.required],
      price: [ '', Validators.required],
      size: [ '', Validators.required],
      color: [ '', Validators.required],
      available: [ '', Validators.required],
      discount: [ '', Validators.required],
      imageUrl: [ '', Validators.required]
    });
  }

  move(modelId) {

    // todo: db shema has wrong name, associations are correct.
    this.product.category_id = modelId;
    this.productService.update(this.product).subscribe(data => {
      this.selectedModel = data.model.model_id;
      this.selectedCategory = data.model.category.category_id;
      this.product = data;
    });
  }

  update() {
    const form = this.productForm.value;
    form.imageUrl = this.productForm.get('imageUrl').value;
    form.product_id = this.product.product_id;
    this.productService.update(form).subscribe(data => {
      this.selectedModel = data.model.model_id;
      this.selectedCategory = data.model.category.category_id;
      this.product = data;
    });
  }

  delete() {
    this.productService.delete(this.product.product_id).subscribe(data => {
      this.router.navigate(['/dashboard', 'product-list']);
    });
  }


}
