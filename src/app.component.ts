import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameEffects } from './features/game/state/game.effects';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  _0 = inject(GameEffects);
}
