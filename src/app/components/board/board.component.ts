import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from '@angular/common';
import { BoardSquare } from '../../models/board-square';

@Component({
  selector: 'snake-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Input({ required: true })
  squares!: BoardSquare[][];

  @Input()
  gameOver?: boolean | null;

  @Input({required: true})
  score!: number;

  @Input({required: true})
  paused!: boolean;

  @Output()
  tryAgain = new EventEmitter<void>();

  @Output()
  unpause = new EventEmitter<void>();

  get gridStyle(): string {
    return `repeat(${this.squares.length}, 1fr)`;
  }
}
