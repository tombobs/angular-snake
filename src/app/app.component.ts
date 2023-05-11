import { Component } from '@angular/core';
import { BannerComponent } from './components/banner/banner.component';
import { FooterComponent } from './components/footer/footer.component';
import { GameComponent } from './components/game/game.component';

@Component({
  standalone: true,
  imports: [GameComponent, BannerComponent, FooterComponent],
  selector: 'snake-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
}
