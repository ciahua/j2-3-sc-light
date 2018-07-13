import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseSystemComponent } from './license-system.component';

describe('LicenseSystemComponent', () => {
  let component: LicenseSystemComponent;
  let fixture: ComponentFixture<LicenseSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
