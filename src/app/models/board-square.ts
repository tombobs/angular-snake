import { Snake } from "./snake";

export interface IBoardSquare {
  row: number;
  column: number;
}

export class BoardSquare {

  row: number;
  column: number;

  constructor(square: IBoardSquare, foodSquares: IBoardSquare[], snake: Snake) {
    this.row = square.row;
    this.column = square.column;

    this.hasFood = !!foodSquares.find(s => s.column === this.column && s.row === this.row);
    this.hasSnake = !!snake.body.find(s => s.column === this.column && s.row === this.row);
  }

  hasSnake = false;
  hasFood = false;
}

