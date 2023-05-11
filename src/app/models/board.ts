import { Snake } from './snake';
import { BoardSquare, IBoardSquare } from './board-square';
import { boardSize } from '../constants';
import { Direction } from './direction';
import { BehaviorSubject, Subject } from 'rxjs';

export class Board {
  private snake: Snake = new Snake();
  private foodSquares: IBoardSquare[] = this.createFoodSquares();
  private squares: BoardSquare[][] = this.buildSquares();
  private initialised = false;
  private _gameOver = false;

  squares$ = new BehaviorSubject<BoardSquare[][]>(this.squares);
  reset$ = new Subject<void>();

  step(direction: Direction): void {
    const move: IBoardSquare = this.getNextMove(direction);
    const nextSquare: BoardSquare = this.getNextSquare(move);
    if (!nextSquare) {
      return;
    }

    this.updateSnakeAndFood(nextSquare);
    this.squares$.next(this.squares);
  }

  reset(): void {
    this.snake = new Snake();
    this.foodSquares = this.createFoodSquares();
    this.squares = this.buildSquares();
    this.initialised = false;
    this._gameOver = false;
  }

  get score(): number {
    return this.snake.body.length - 2;
  }

  get gameOver(): boolean {
    return this._gameOver;
  }

  private placeFood(): void {
    const row = Math.floor(Math.random() * boardSize);
    const column = Math.floor(Math.random() * boardSize);
    this.foodSquares.push({ row, column });
    this.squares[row][column].hasFood = true;
  }

  private getNextSquare(next: IBoardSquare): BoardSquare {
    const nextRow = this.squares[next.row!];
    if (!nextRow) {
      console.log('dead - hit wall');
      this._gameOver = true;
    }
    const nextCell = nextRow?.[next.column!];
    if (!nextCell) {
      console.log('dead - hit wall');
      this._gameOver = true;
    }
    return nextCell;
  }

  private getNextMove(direction: Direction): IBoardSquare {
    const head = this.snake.body[0];
    let nextMove: Partial<IBoardSquare> = {};
    switch (direction) {
      case Direction.Up:
        nextMove = { ...head, row: head.row - 1 };
        break;
      case Direction.Down:
        nextMove = { ...head, row: head.row + 1 };
        break;
      case Direction.Left:
        nextMove = { ...head, column: head.column - 1 };
        break;
      case Direction.Right:
        nextMove = { ...head, column: head.column + 1 };
        break;
    }
    return nextMove as IBoardSquare;
  }

  private updateSnakeAndFood(nextSquare: BoardSquare): void {
    this.snake.body.unshift(nextSquare);
    if (nextSquare.hasSnake) {
      if (this.initialised) {
        console.log('dead- hit snake');
        this._gameOver = true;
      }
      this.initialised = true;
    }
    nextSquare.hasSnake = true;

    if (nextSquare.hasFood) {
      // remove food & place more food
      const food = this.foodSquares.pop();
      this.squares[food!.row][food!.column].hasFood = false;
      this.placeFood();
    } else {
      const cellToRemove = this.snake.body.pop();
      const row = this.squares[cellToRemove!.row];
      const square = row[cellToRemove!.column];
      square.hasSnake = false;
    }
  }

  private buildSquares(): BoardSquare[][] {
    return Array(boardSize)
      .fill('')
      .map((_, row: number) =>
        Array(boardSize)
          .fill('')
          .map(
            (_, column: number) =>
              new BoardSquare({ row, column }, this.foodSquares, this.snake)
          )
      );
  }

  private createFoodSquares(): IBoardSquare[] {
    return [{ row: 2, column: 5 }];
  }
}
