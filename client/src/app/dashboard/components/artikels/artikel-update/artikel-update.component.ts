import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArtikelService } from 'src/app/dashboard/services/artikel.service';
import { NotificationService } from 'src/app/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryService } from 'src/app/dashboard/services/category.service';
import { ArtikelCategoryService } from 'src/app/dashboard/services/artikel-category.service';


@Component({
  selector: 'cristal-artikel-update',
  templateUrl: './artikel-update.component.html',
  styleUrls: ['./artikel-update.component.css']
})
export class ArtikelUpdateComponent implements OnInit {

  artikelForm: FormGroup;
  artikel: any;
  param: any;
  categories: any [];

  constructor(private artikelService: ArtikelService,
              private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private categoryService: ArtikelCategoryService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.createArtikelForm();
    this.route.params.subscribe(params => {
      this.param = params.id;
      this.getDetails(this.param);
    });

    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    })
  }

  getDetails(artikel_id){
    this.artikelService.getById(artikel_id).subscribe(artkl => {
      this.artikel = artkl;
      this.artikelForm.get('title').setValue(this.artikel.title);
      this.artikelForm.get('body').setValue(this.artikel.body);
    });
    }

  setImageUrl(imageUrl) {
    this.artikelForm.get('image_url').setValue(imageUrl);
  }

  createArtikelForm() {
    this.artikelForm = this.fb.group({
      image_url: [ '', Validators.required],
      title: [ '', Validators.required],
      body: [ '', Validators.required],
      category: [ '', Validators.required],
    });
  }

  setCategory(category){
    console.log('set category', category);
    this.artikelForm.get('category').setValue(category);
  }

  update() {
    const categoryId = this.artikelForm.get('category').value;
    const form = this.artikelForm.value;
    form.category_id = categoryId;
    form.artikel_id = this.artikel.artikel_id;
    this.artikelService.update(form)
    .subscribe(
      (data) => {
      this.artikel = data;
      this.notificationService.success('Artikel updated!');
      this.router.navigate(['/dashboard', 'artikels', 'artikel-list']);
    },
    (response: HttpErrorResponse) => { 
      this.notificationService.error(`Artikel could not be updated! ${response.error}`); });
  }

  delete() {
    this.artikelService.delete(this.artikel.artikel_id)
    .subscribe(
      (data) => {
        this.notificationService.success('Artikel deleted!');
        this.router.navigate(['/dashboard', 'artikels', 'artikel-list']);
    },
    (response: HttpErrorResponse) => { 
      this.notificationService.error(`Artikel could not be deleted! ${response.error}`); });
  }
}
