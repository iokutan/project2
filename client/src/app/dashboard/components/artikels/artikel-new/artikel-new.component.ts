import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArtikelService } from 'src/app/dashboard/services/artikel.service';

@Component({
  selector: 'cristal-artikel-new',
  templateUrl: './artikel-new.component.html',
  styleUrls: ['./artikel-new.component.css']
})
export class ArtikelNewComponent implements OnInit {

  artikelForm: FormGroup;
  artikel: any;

  constructor(private artikelService: ArtikelService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.createArtikelForm();
  }

  createArtikelForm() {
    this.artikelForm = this.fb.group({
      image_url: [ '', Validators.required],
      titel: [ '', Validators.required],
      body: [ '', Validators.required],

    });
  }
  setImageUrl(imageUrl) {
    this.artikelForm.get('image_url').setValue(imageUrl);
  }
  add() {
    const form = this.artikelForm.value;
    this.artikelService.create(form).subscribe(data => {
      this.artikel = data;
    });
  }

}