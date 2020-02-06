import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productForm: FormGroup;

  constructor(private productService: ProductService,
              private fb: FormBuilder) { }

  createProductForm() {
    this.productForm = this.fb.group({
      titel: ['', Validators.required],
      description: ['', Validators.required],
      stock: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.createProductForm();
  }

  add() {
    if (this.productForm.valid) {

    }
  }

}
