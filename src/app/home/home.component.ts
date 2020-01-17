import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {ConstantsService} from '../services/constants.service';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {
  companyName;
  images: string[];
  showNavigationArrows = false;
  interval = 2000;
  showNavigationIndicators: false;
  pauseOnHover = false;

  constructor(config: NgbCarouselConfig, private constants: ConstantsService, private viewportScroller: ViewportScroller) {
    config.interval = this.interval;
    config.showNavigationArrows = this.showNavigationArrows;
    config.showNavigationIndicators = this.showNavigationIndicators;
    config.pauseOnHover = this.pauseOnHover;
    this.companyName = constants.appname;
  }

  ngOnInit() {
    this.fillImageArray();
  }

  fillImageArray() {
    this.images = [
      '../../assets/img/hunters-race-MYbhN8KaaEc-unsplash.jpg',
      '../../assets/img/allef-vinicius-1-unsplash.jpg',
      '../../assets/img/hunters-race-hNoSCxPWYII-unsplash.jpg',
      '../../assets/img/OmegaPlanet.jpg'
    ];
  }
}
