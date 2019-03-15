import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallLogComponent } from './install-log.component';

describe('InstallLogComponent', () => {
  let component: InstallLogComponent;
  let fixture: ComponentFixture<InstallLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
