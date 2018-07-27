import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalamityComponent } from './calamity.component';

describe('CalamityComponent', () => {
  let component: CalamityComponent;
  let fixture: ComponentFixture<CalamityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalamityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalamityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
