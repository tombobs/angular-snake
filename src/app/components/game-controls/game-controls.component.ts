import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TouchControlsComponent } from './touch-controls/touch-controls.component';
import { KeyboardControlsComponent } from './keyboard-controls/keyboard-controls.component';

@Component({
  selector: 'snake-game-controls',
  standalone: true,
  imports: [CommonModule, TouchControlsComponent, KeyboardControlsComponent],
  templateUrl: './game-controls.component.html',
  styleUrls: ['./game-controls.component.scss'],
})
export class GameControlsComponent {

  @Input({required: true})
  isTouchDevice!: boolean;

}
