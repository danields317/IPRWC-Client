import { Component, OnInit } from '@angular/core';
import {ConstantsService} from '../services/constants.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  companyName;

  constructor(private constants: ConstantsService) {
    this.companyName = constants.appname;
  }

  ngOnInit() {
  }

}
