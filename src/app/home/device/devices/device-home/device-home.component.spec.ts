import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceHomeComponent } from './device-home.component';

describe('DeviceHomeComponent', () => {
  let component: DeviceHomeComponent;
  let fixture: ComponentFixture<DeviceHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
