import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineLogComponent } from './line-log.component';

describe('LineLogComponent', () => {
  let component: LineLogComponent;
  let fixture: ComponentFixture<LineLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
