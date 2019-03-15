import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirHomeComponent } from './air-home.component';

describe('AirHomeComponent', () => {
  let component: AirHomeComponent;
  let fixture: ComponentFixture<AirHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
