import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionDefinitionComponent } from './function-definition.component';

describe('FunctionDefinitionComponent', () => {
  let component: FunctionDefinitionComponent;
  let fixture: ComponentFixture<FunctionDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
