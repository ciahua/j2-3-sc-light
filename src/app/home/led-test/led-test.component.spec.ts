import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedTestComponent } from './led-test.component';

describe('LedTestComponent', () => {
  let component: LedTestComponent;
  let fixture: ComponentFixture<LedTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
