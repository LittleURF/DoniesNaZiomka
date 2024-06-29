import { Injectable, inject } from '@angular/core';
import { Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { GameSelectors } from './game.selectors';
import { NEVER, filter, map, of, switchMap, takeUntil, tap, timer } from 'rxjs';
import { GameActions } from './game.actions';

@Injectable()
export class GameEffects {
  private readonly store = inject(Store);
  private readonly actions$ = inject(Actions);

  constructor() {
    this.runGameStartCountdown();
    this.runGameProgressCountdown();
  }

  // MAKE THEM START ON PROPER ACTIONS & DISPLAY THE COUNTDOWN.
  private runGameStartCountdown() {
    this.actions$
      .pipe(
        ofActionSuccessful(GameActions.PrepareGame),
        switchMap(() => timer(2_000)),
        tap(() => this.store.dispatch(GameActions.StartGame)),
      )
      .subscribe();
  }

  private runGameProgressCountdown() {
    this.actions$
      .pipe(
        ofActionSuccessful(GameActions.StartGame),
        switchMap(() =>
          timer(15_000).pipe(
            takeUntil(this.actions$.pipe(ofActionSuccessful(GameActions.FinishGame))),
          ),
        ),
        tap(() => this.store.dispatch(GameActions.GameTimerRanOut)),
      )
      .subscribe();
  }
}
