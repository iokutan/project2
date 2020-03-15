import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelService } from 'src/app/dashboard/services/model.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/dashboard/services/category.service';
import { NotificationService } from 'src/app/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'cristal-model-update',
  templateUrl: './model-update.component.html',
  styleUrls: ['./model-update.component.css']
})
export class ModelUpdateComponent implements OnInit {

  param: any;
  modelForm: FormGroup;
  model: any; 
  categories: any[];

  constructor(private modelService: ModelService,
              private router: Router,
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.createModelForm();
    this.route.params.subscribe(params => {
      this.param = params['id'];
      this.categoryService.getAll().subscribe(data => { 
        this.categories = data;
        this.getModelDetails();
      });
    });

    
  }

  getModelDetails(){
    this.modelService.getById(this.param).subscribe(data => {
      this.model = data;
      this.modelForm.get('model_name').setValue(this.model.model_name)
      this.modelForm.get('category_name').setValue(this.categories.find(a => a.category_id == this.model.category_id))
    });
  }

  createModelForm() {
    this.modelForm = this.fb.group({
      model_name: [ '', Validators.required],
      category_name: [ '', Validators.required]
    });
  }

  update(){
    const form = this.modelForm.value;
    form.category_id = form.category_name.category_id;
    form.model_id = this.model.model_id;
    this.modelService.update(form)
    .subscribe(
      (data) => {
      this.notificationService.success('Model updated!');
      this.getModelDetails();
      this.router.navigate(['/dashboard','products','model-list']);
    },
    (response: HttpErrorResponse) => { 
      this.notificationService.error(`Model could not be updated! ${response.error}`); });
  }

  delete(){
    this.modelService.delete(this.model.model_id)
    .subscribe(
      (data) => {
        this.notificationService.success('Model deleted!');
        this.router.navigate(['/dashboard','products','model-list']);
    },
    (response: HttpErrorResponse) => { 
      this.notificationService.error(`Model could not be deleted! ${response.error}`); });
  }

}
