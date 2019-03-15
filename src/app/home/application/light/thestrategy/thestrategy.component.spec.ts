import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThestrategyComponent } from './thestrategy.component';

describe('ThestrategyComponent', () => {
  let component: ThestrategyComponent;
  let fixture: ComponentFixture<ThestrategyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThestrategyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThestrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
