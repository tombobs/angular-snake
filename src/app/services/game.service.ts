import { Injectable, OnDestroy } from '@angular/core';
import { filter, finalize, interval, Subject, takeUntil, takeWhile, tap } from 'rxjs';
import { gameLoopTime } from '../constants';
import { Board } from '../models/board';
import { GameControlsService } from './game-controls.service';

@Injectable({
  providedIn: 'root'
})
export class GameService implements OnDestroy {

  constructor(private gameControlsService: GameControlsService) {
  }

  highScore: number = this.previousHighScore;
  set paused(paused: boolean) {
    this._paused = paused;
    this.gameControlsService.gameRunning = !paused;
  }

  get paused(): boolean {
    return this._paused!;
  }

  startGame(board: Board): void {
    board.reset();
    this.gameControlsService.reset();
    interval(gameLoopTime)
      .pipe(
        filter(() => !this.paused),
        tap(() => this.gameControlsService.step()),
        tap(() => board.step(this.gameControlsService.direction)),
        tap(() => this.checkHighScore(board)),
        takeWhile(() => !board.gameOver),
        finalize(() => {
          this.gameControlsService.gameRunning = false;
          this.saveHighScore();
        })
      )
      .subscribe();
  }

  initialise(board: Board): void {
    this.gameControlsService.tap$
      .pipe(
        tap(() => {
          if (board.gameOver) {
            this.startGame(board);
          } else {
            this.paused = !this.paused;
          }
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private checkHighScore(board: Board): void {
    if (board.score > this.highScore) {
      this.highScore = board.score;
    }
  }

  private saveHighScore(): void {
    if (this.highScore > this.previousHighScore) {
      localStorage.setItem('highScore', this.highScore.toString());
    }
  }

  private get previousHighScore(): number {
    return Number(localStorage.getItem('highScore')) || 0;
  }

  private unsubscribe$ = new Subject<void>();
  private _paused?: boolean;
}
