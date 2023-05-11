import { IBoardSquare } from './board-square';
import { Direction } from './direction';

export class Snake {
  body: IBoardSquare[] = [
    { row: 1, column: 1 },
    { row: 1, column: 2 },
  ];

  rows: number[] = [];
  columns: number[] = [];

  static step(direction: Direction, snake: Snake) {
    const head = snake.body[snake.body.length - 1];
    let next: Partial<IBoardSquare> = {};
    switch (direction) {
      case Direction.Up:
        next = { ...head, row: head.row - 1 };
        break;
      case Direction.Down:
        next = { ...head, row: head.row + 1 };
        break;
      case Direction.Left:
        next = { ...head, column: head.column - 1 };
        break;
      case Direction.Right:
        next = { ...head, column: head.column + 1 };
        break;
    }
    snake.body.unshift(next as IBoardSquare);
    const cellToRemove = snake.body.pop();

    return { snake: { ...snake }, cellToRemove };
  }
}
