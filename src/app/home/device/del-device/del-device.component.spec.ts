import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelDeviceComponent } from './del-device.component';

describe('DelDeviceComponent', () => {
  let component: DelDeviceComponent;
  let fixture: ComponentFixture<DelDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
