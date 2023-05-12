import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouchControlsComponent } from './touch-controls.component';

describe('TouchControlsComponent', () => {
  let component: TouchControlsComponent;
  let fixture: ComponentFixture<TouchControlsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TouchControlsComponent]
    });
    fixture = TestBed.createComponent(TouchControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
