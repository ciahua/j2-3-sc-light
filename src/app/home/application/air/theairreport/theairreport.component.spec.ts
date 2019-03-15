import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheairreportComponent } from './theairreport.component';

describe('TheairreportComponent', () => {
  let component: TheairreportComponent;
  let fixture: ComponentFixture<TheairreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheairreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheairreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
