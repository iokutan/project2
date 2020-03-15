import { Component, OnInit, ViewChild } from '@angular/core';
import { Feature } from 'src/app/Feature';
import { ArtikelService } from 'src/app/dashboard/services/artikel.service';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';



@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  sliders: any[];
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;
  
  constructor(private productService: ArtikelService) {}

  ngOnInit() {
    this.productService.getAll().subscribe(data =>{
      this.sliders = data.filter(a => a.category.category_name == 'Slider');
    })
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

}
