import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArtikelCategoryService } from 'src/app/dashboard/services/artikel-category.service';
import { NotificationService } from 'src/app/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'cristal-artikel-category-new',
  templateUrl: './artikel-category-new.component.html',
  styleUrls: ['./artikel-category-new.component.css']
})
export class ArtikelCategoryNewComponent implements OnInit {
  artikelCategoryForm: FormGroup;
  constructor(private ArtikelCategoryService: ArtikelCategoryService,
              private route: ActivatedRoute,
              private router: Router,
              private notificationService: NotificationService,
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
    this.ArtikelCategoryService.create(form)
    .subscribe(
      (data) => {
        this.notificationService.success('Artikel Category added!');
        this.router.navigate(['/dashboard', 'artikels', 'artikel-category-list']);
    },
    (response: HttpErrorResponse) => { 
      this.notificationService.error(`Artikel Category could not be added! ${response.error}`); });
  }

}
