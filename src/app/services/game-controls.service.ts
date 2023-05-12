import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subject, takeUntil, tap } from 'rxjs';
import { Direction } from '../models/direction';

@Injectable({
  providedIn: 'root'
})
export class GameControlsService implements OnDestroy {

  direction: Direction = Direction.Right;
  tap$ = new Subject<void>();
  gameRunning = false;

  constructor() {
    this.setupKeyboardListener();
    this.setupTouchListener();
  }

  step(): void {
    this.gameRunning = true;
    this.direction = this.nextDirection!;
  }

  reset(): void {
    this.direction = Direction.Right;
    this.nextDirection = Direction.Right;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private unsubscribe$ = new Subject<void>();
  private nextDirection?: Direction = Direction.Right;

  private setupKeyboardListener(): void {
    fromEvent(document, 'keydown')
      .pipe(
        tap((e: Event) => this.handleKeypress(e)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  private setupTouchListener(): void {
    let touchStartX = 0
    let touchEndX = 0
    let touchStartY = 0
    let touchEndY = 0

    const handleSwipe = () => {
      const xDiff = touchStartX - touchEndX ;
      const yDiff = touchStartY - touchEndY;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff < 0) {
          return this.handleRight();
        }
        this.handleLeft();
      } else {
        if (yDiff > 0) {
          return this.handleUp();
        }
        this.handleDown();
      }
    }


    document.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    })

    document.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    })
  }

  private handleKeypress(e: Event): void {
    switch ((e as KeyboardEvent).code) {
      case 'ArrowDown':
        return this.handleDown();
      case 'ArrowUp':
        return this.handleUp();
      case 'ArrowLeft':
        return this.handleLeft();
      case 'ArrowRight':
        return this.handleRight();
      case 'Space':
        return this.tap$.next();
    }
  }

  private handleUp(): void {
    if (this.direction !== Direction.Down) {
      this.nextDirection = Direction.Up;
    }
  }

  private handleRight(): void {
    if (this.direction !== Direction.Left) {
      this.nextDirection = Direction.Right;
    }
  }

  private handleDown(): void {
    if (this.direction !== Direction.Up) {
      this.nextDirection = Direction.Down;
    }
  }

  private handleLeft(): void {
    if (this.direction !== Direction.Right) {
      this.nextDirection = Direction.Left;
    }
  }
}
