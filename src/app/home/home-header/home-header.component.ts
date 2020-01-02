import { Component, OnInit } from '@angular/core';
import {ConstantsService} from '../../services/constants.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit {

  companyName;

  constructor(private constants: ConstantsService) {
    this.companyName = this.constants.appname;
  }

  ngOnInit() {
  }

}
