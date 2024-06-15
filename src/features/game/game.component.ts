import { Component, computed, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { GameActions } from './state/game.actions';
import { GameSelectors } from './state/game.selectors';
import { DateTime } from 'luxon';
import { CountdownPipe } from '../../shared/pipes/countdown.pipe';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  imports: [CountdownPipe, CommonModule],
})
export class GameComponent {
  private readonly store = inject(Store);

  public readonly startDateIso = this.store.selectSignal(GameSelectors.StartDateIso);

  public readonly status = this.store.selectSignal(GameSelectors.Status);
  public readonly textToWrite = this.store.selectSignal(GameSelectors.TextToWrite);

  // // public secondsUntilStart = computed(() => {
  // //   if (!this.startDateIso()) {
  // //     return 0;
  // //   }

  // //   const startDate = DateTime.fromISO(this.startDateIso()!);
  // //   const secondsUntilStart = DateTime.utc().diff(startDate).as('seconds');

  // //   return secondsUntilStart;
  // // });

  startGame() {
    this.store.dispatch(new GameActions.PrepareGame());
  }
}
