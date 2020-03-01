import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'cristal-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit {
  public imageData : any;
  @Input() imageUrl: string;
  @Output() setImageUrl = new EventEmitter()

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  uploadImage(input){
    if(input && !input.files[0]){
      return;
    }
    const file = input.files[0];
    const formData = new FormData();
    
    formData.append('file', file, file.name);

    this.productService.uploadFile(formData).subscribe(data => {
      this.imageData = data;
      this.imageUrl = data.imagePath;
      this.setImageUrl.emit(this.imageUrl);
    })
  }

}
