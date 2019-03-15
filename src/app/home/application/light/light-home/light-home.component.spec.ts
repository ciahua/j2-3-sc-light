import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LightHomeComponent } from './light-home.component';

describe('LightHomeComponent', () => {
  let component: LightHomeComponent;
  let fixture: ComponentFixture<LightHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LightHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
