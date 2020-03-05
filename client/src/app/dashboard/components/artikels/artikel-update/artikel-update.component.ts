import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArtikelService } from 'src/app/dashboard/services/artikel.service';


@Component({
  selector: 'cristal-artikel-update',
  templateUrl: './artikel-update.component.html',
  styleUrls: ['./artikel-update.component.css']
})
export class ArtikelUpdateComponent implements OnInit {

  artikelForm: FormGroup;
  artikel: any;
  param: any;

  constructor(private artikelService: ArtikelService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.createArtikelForm();
    this.route.params.subscribe(params => {
      this.param = params.id;
      this.getDetails(this.param);
    });
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

    });
  }

  update() {
    const form = this.artikelForm.value;
    form.artikel_id = this.artikel.artikel_id;
    this.artikelService.update(form).subscribe(data => {
      this.artikel = data;
    });
  }

  delete() {
    this.artikelService.delete(this.artikel.artikel_id).subscribe(data => {
      this.router.navigate(['/dashboard', 'artikel-list']);
    });
  }

}
