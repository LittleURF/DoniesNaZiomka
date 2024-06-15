import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { GameActions } from './game.actions';
import { updateState } from '../../../core/utils/ngxs';
import { tap, timer } from 'rxjs';
import { DateTime } from 'luxon';

export interface GameStateModel {
  status: 'waiting' | 'starting' | 'running';
  startDateIso: string | null;
  textToWrite: string;
}

@State<GameStateModel>({
  name: 'game',
  defaults: {
    status: 'waiting',
    startDateIso: null,
    textToWrite: '',
  },
})
@Injectable()
export class GameState {
  @Action(GameActions.PrepareGame)
  prepareGame(ctx: StateContext<GameStateModel>) {
    updateState(ctx, (state) => {
      state.status = 'starting';
      state.startDateIso = DateTime.utc().plus({ seconds: 15 }).toISO();
    });
    ctx.dispatch(new GameActions.StartGame());
  }

  @Action(GameActions.StartGame)
  startGame(ctx: StateContext<GameStateModel>) {
    const startDate = new Date(ctx.getState().startDateIso!);

    return timer(startDate).pipe(
      tap(() => {
        updateState(ctx, (state) => {
          state.status = 'running';
          state.textToWrite = 'Wysyłam Ci gościu powiadomienie testowe.';
        });
      }),
    );
  }
}
