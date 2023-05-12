import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'snake-touch-controls',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './touch-controls.component.html',
  styleUrls: ['./touch-controls.component.scss']
})
export class TouchControlsComponent {

  constructor(private gameService: GameService) {
  }

  togglePause(): void {
    this.gameService.paused = !this.gameService.paused;
  }

  get isPaused(): boolean {
    return this.gameService.paused;
  }
}
