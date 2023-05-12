import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from '../board/board.component';
import { GameControlsComponent } from '../game-controls/game-controls.component';
import { ScoreComponent } from '../score/score.component';
import { Board } from '../../models/board';
import { BannerComponent } from '../banner/banner.component';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'snake-game',
  standalone: true,
  imports: [CommonModule, BoardComponent, GameControlsComponent, ScoreComponent, BannerComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  board: Board = new Board();
  isTouchDevice = false;

  constructor(public gameService: GameService) {
  }

  ngOnInit(): void {
    this.gameService.initialise(this.board);
    this.gameService.startGame(this.board);

    this.isTouchDevice = (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      ((navigator as any).msMaxTouchPoints > 0));
  }
}
