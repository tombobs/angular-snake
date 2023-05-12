import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardControlsComponent } from './keyboard-controls.component';

describe('KeyboardControlsComponent', () => {
  let component: KeyboardControlsComponent;
  let fixture: ComponentFixture<KeyboardControlsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [KeyboardControlsComponent]
    });
    fixture = TestBed.createComponent(KeyboardControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
