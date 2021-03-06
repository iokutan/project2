import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtikelCategoryService } from 'src/app/dashboard/services/artikel-category.service';
import { NotificationService } from 'src/app/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'cristal-artikel-category-update',
  templateUrl: './artikel-category-update.component.html',
  styleUrls: ['./artikel-category-update.component.css']
})
export class ArtikelCategoryUpdateComponent implements OnInit {

  param: any;
  artikelCategoryForm: FormGroup;
  artikelCategory: any; 

  constructor(private artikelCategoryService: ArtikelCategoryService,
              private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private fb: FormBuilder) { }

    ngOnInit() {
    this.route.params.subscribe(params => {
      this.param = params['id'];
      this.getCategoryDetails();
    });
    this.createArtikelCategoryForm();
  }

  getCategoryDetails(){
    this.artikelCategoryService.getById(this.param).subscribe(data => {
      this.artikelCategory = data;
      this.artikelCategoryForm.get('category_name').setValue(this.artikelCategory.category_name)
    });
  }

  createArtikelCategoryForm() {
    this.artikelCategoryForm = this.fb.group({
      category_name: [ '', Validators.required]
    });
  }

  update(){
    const categoryName = this.artikelCategoryForm.get('category_name').value;
    this.artikelCategory.category_name = categoryName;
    this.artikelCategoryService.update(this.artikelCategory)
    .subscribe(
      (data) => {
        this.notificationService.success('Artikel Category updated!');
        this.getCategoryDetails();
        this.router.navigate(['/dashboard', 'artikels', 'artikels-category-list']);
    },
    (response: HttpErrorResponse) => { 
      this.notificationService.error(`Artikel Category could not be updated! ${response.error}`); });  }

  delete(){
    this.artikelCategoryService.delete(this.artikelCategory.category_id)
    .subscribe(
      (data) => {
        this.notificationService.success('Artikel Category deleted!'); 
        this.router.navigate(['/dashboard','artikels','artikel-category-list']);
    },
    (response: HttpErrorResponse) => { 
      this.notificationService.error(`Artikel Category could not be deleted! ${response.error}`); });
  }

}
