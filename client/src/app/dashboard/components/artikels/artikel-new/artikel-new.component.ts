import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArtikelService } from 'src/app/dashboard/services/artikel.service';
import { NotificationService } from 'src/app/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ArtikelCategoryService } from 'src/app/dashboard/services/artikel-category.service';

@Component({
  selector: 'cristal-artikel-new',
  templateUrl: './artikel-new.component.html',
  styleUrls: ['./artikel-new.component.css']
})
export class ArtikelNewComponent implements OnInit {

  artikelForm: FormGroup;
  artikel: any;
  categories: any [];

  constructor(private artikelService: ArtikelService,
              private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private categoryService: ArtikelCategoryService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.createArtikelForm();
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    })
  }

  createArtikelForm() {
    this.artikelForm = this.fb.group({
      image_url: [ '', Validators.required],
      title: [ '', Validators.required],
      body: [ '', Validators.required],
      category: [ '', Validators.required],
    });
  }

  setImageUrl(imageUrl) {
    this.artikelForm.get('image_url').setValue(imageUrl);
  }

  setCategory(category){
    this.artikelForm.get('category').setValue(category);
  }

  add() {
    const categoryId = this.artikelForm.get('category').value;
    const form = this.artikelForm.value;
    form.category_id = categoryId;

    this.artikelService.create(form).subscribe(data => {
        this.artikel = data;
        this.notificationService.success('Artikel added!');
        this.router.navigate(['/dashboard', 'artikels', 'artikel-list']);

      },
      (response: HttpErrorResponse) => { 
        this.notificationService.error(`Artikel could not be added! ${response.error}`); 
      });
  }
}
