import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SqModalComponent } from './sq-modal.component';

describe('SqModalComponent', () => {
  let component: SqModalComponent;
  let fixture: ComponentFixture<SqModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SqModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SqModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
