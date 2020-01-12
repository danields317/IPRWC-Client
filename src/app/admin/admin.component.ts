import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [
    trigger('collapseNavbar', [
      state('expanded', style({
      })),
      state('collapsed', style({
        width: '0px',
        height: '0px',
        overflow: 'hidden'
      })),
      transition('expanded <=> collapsed', [animate(500)])
    ])
  ]
})
export class AdminComponent implements OnInit {
  collapsed = false;

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.collapsed === true ? this.collapsed = false : this.collapsed = true;
  }
}
