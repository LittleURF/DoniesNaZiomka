import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { GameActions } from './features/game/state/game.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly store = inject(Store);

  constructor() {
    setTimeout(() => {
      this.store.dispatch(new GameActions.ChangeApp('Mammoniada'));
    }, 5000);
  }
}
