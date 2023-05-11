import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'snake-game-controls',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-controls.component.html',
  styleUrls: ['./game-controls.component.scss'],
})
export class GameControlsComponent {}
