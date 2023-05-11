import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from '../board/board.component';
import { GameControlsComponent } from '../game-controls/game-controls.component';
import { ScoreComponent } from '../score/score.component';
import { Board } from '../../models/board';
import { Direction } from '../../models/direction';
import { filter, finalize, fromEvent, interval, Subject, takeUntil, takeWhile, tap } from 'rxjs';
import { gameLoopTime } from '../../constants';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'snake-game',
  standalone: true,
  imports: [CommonModule, BoardComponent, GameControlsComponent, ScoreComponent, BannerComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  board: Board = new Board();
  direction?: Direction;
  nextDirection?: Direction;
  highScore: number = this.previousHighScore;
  paused: boolean = false;

  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.startGame();

    fromEvent(document, 'keydown')
      .pipe(
        tap((e: Event) => this.handleKeypress(e)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
    //
    // // fromEvent(document, 'touchmove')
    // //   .pipe(
    // //     tap((e: Event) => alert(e.bubb)),
    // //     takeUntil(this.unsubscribe$)
    // //   )
    // //   .subscribe();
    //
    // let touchstartX = 0
    // let touchendX = 0
    //
    // function checkDirection() {
    //   if (touchendX < touchstartX) alert('swiped left!')
    //   if (touchendX > touchstartX) alert('swiped right!')
    // }
    //
    // document.addEventListener('touchstart', e => {
    //   touchstartX = e.changedTouches[0].screenX
    // })
    //
    // document.addEventListener('touchend', e => {
    //   touchendX = e.changedTouches[0].screenX
    //   checkDirection()
    // })

    this.board.reset$
      .pipe(
        tap(() => this.startGame()),
        takeUntil(this.unsubscribe$)
      ).subscribe();
  }

  startGame(): void {
    this.board.reset();
    this.nextDirection = Direction.Right;
    interval(gameLoopTime)
      .pipe(
        filter(() => !this.paused),
        tap(() => this.direction = this.nextDirection),
        tap(() => this.board.step(this.direction!)),
        tap(() => this.checkHighScore()),
        takeWhile(() => !this.board.gameOver),
        finalize(() => this.saveHighScore())
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private checkHighScore(): void {
    if (this.board.score > this.highScore) {
      this.highScore = this.board.score;
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

  private handleKeypress(e: Event): void {
    switch ((e as KeyboardEvent).code) {
      case 'ArrowDown':
        if (this.direction !== Direction.Up) {
          this.nextDirection = Direction.Down;
        }
        break;
      case 'ArrowUp':
        if (this.direction !== Direction.Down) {
          this.nextDirection = Direction.Up;
        }
        break;
      case 'ArrowLeft':
        if (this.direction !== Direction.Right) {
          this.nextDirection = Direction.Left;
        }
        break;
      case 'ArrowRight':
        if (this.direction !== Direction.Left) {
          this.nextDirection = Direction.Right;
        }
        break;
      case 'Space':
        if (this.board.gameOver) {
          this.startGame();
        } else {
          this.paused = !this.paused;
        }
        break;
    }
  }

}
