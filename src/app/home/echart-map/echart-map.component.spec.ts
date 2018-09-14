import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartMapComponent } from './echart-map.component';

describe('EchartMapComponent', () => {
  let component: EchartMapComponent;
  let fixture: ComponentFixture<EchartMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
