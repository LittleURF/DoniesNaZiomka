import { Injectable, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { GameSelectors } from './game.selectors';
import { NEVER, filter, map, of, switchMap, tap, timer } from 'rxjs';
import { DateTime, Duration } from 'luxon';
import { GameActions } from './game.actions';

@Injectable()
export class GameEffects {
  private readonly store = inject(Store);
  constructor() {
    this.runGameStartCountdown();
    this.runGameProgressCountdown();
  }

  // MAKE THEM START ON PROPER ACTIONS & DISPLAY THE COUNTDOWN.
  private runGameStartCountdown() {
    this.store
      .select(GameSelectors.StartDateIso)
      .pipe(
        switchMap((date) => (date ? timer(2_000) : NEVER)),
        tap(() => this.store.dispatch(GameActions.StartGame)),
      )
      .subscribe();
  }

  private runGameProgressCountdown() {
    this.store
      .select(GameSelectors.StartDateIso)
      .pipe(
        switchMap((date) => (date ? timer(17_000) : NEVER)),
        tap(() => this.store.dispatch(GameActions.GameTimerRanOut)),
      )
      .subscribe();
  }
}
