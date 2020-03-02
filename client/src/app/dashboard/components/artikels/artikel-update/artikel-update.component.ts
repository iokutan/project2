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

  constructor(private artikelService: ArtikelService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
  }

  createArtikelForm() {
    this.artikelForm = this.fb.group({
      image: [ '', Validators.required],
      titel: [ '', Validators.required],
      body: [ '', Validators.required],

    });
  }

  update() {
    const form = this.artikelForm.value;
    form.product_id = this.artikel.product_id;
    this.artikelService.update(form).subscribe(data => {
      this.artikel = data;
    });
  }

  delete() {
    this.artikelService.delete(this.artikel.product_id).subscribe(data => {
      this.router.navigate(['/dashboard', 'service-list']);
    });
  }

}
