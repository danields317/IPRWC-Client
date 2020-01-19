import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShownOrderComponent } from './shown-order.component';

describe('ShownOrderComponent', () => {
  let component: ShownOrderComponent;
  let fixture: ComponentFixture<ShownOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShownOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShownOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
