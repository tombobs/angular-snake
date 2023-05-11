import { Component, Input } from "@angular/core";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'snake-score',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent {

  @Input({required: true})
  score!: number;

  @Input({required: true})
  highScore!: number;
}
