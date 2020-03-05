import { Component, OnInit } from '@angular/core';
import { ModelService } from 'src/app/dashboard/services/model.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/dashboard/services/category.service';

@Component({
  selector: 'cristal-model-new',
  templateUrl: './model-new.component.html',
  styleUrls: ['./model-new.component.css']
})
export class ModelNewComponent implements OnInit {

  modelForm: FormGroup;
  categories: any[];

  constructor(private modelService: ModelService,
              private route: ActivatedRoute, 
              private router: Router,
              private categoryService: CategoryService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.createOrderForm();
    this.categoryService.getAll().subscribe(data => {
      
        this.categories = data;
    });
  }

  createOrderForm() {
    this.modelForm = this.fb.group({
      model_name: [ '', Validators.required],
      category_name: [ '', Validators.required]
    });
  }

  add(){
    const form = this.modelForm.value;
    form.category_id = form.category_name.category_id;

    this.modelService.create(form).subscribe(data => {
      this.router.navigate(['/dashboard','model-list']);
    })
  }

}
