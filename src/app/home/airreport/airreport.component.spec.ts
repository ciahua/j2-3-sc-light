import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirreportComponent } from './airreport.component';

describe('AirreportComponent', () => {
  let component: AirreportComponent;
  let fixture: ComponentFixture<AirreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
