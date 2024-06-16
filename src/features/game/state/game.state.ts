import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { GameActions } from './game.actions';
import { updateState } from '../../../core/utils/ngxs';
import { tap, timer } from 'rxjs';
import { DateTime } from 'luxon';
import { WordToWrite } from './game';
import { textToWordsToWrite } from './game,utils';

export interface GameStateModel {
  status: 'waiting' | 'starting' | 'running';
  startDateIso: string | null;
  textToWrite: WordToWrite[];
  textInput: string;
}

// The textToWrite is an array of objects
// [{ text: "mortadele", status: "pending | InProgress | finished",  }]
// Selector.currentWord

@State<GameStateModel>({
  name: 'game',
  defaults: {
    status: 'waiting',
    startDateIso: null,
    textToWrite: [],
    textInput: '',
  },
})
@Injectable()
export class GameState {
  @Action(GameActions.PrepareGame)
  prepareGame(ctx: StateContext<GameStateModel>) {
    updateState(ctx, (state) => {
      state.status = 'starting';
      state.startDateIso = DateTime.utc().plus({ seconds: 2 }).toISO();
      state.textToWrite = textToWordsToWrite(
        'Wysyłam Ci gościu powiadomienie testowe. Tak, powiadomienie testowe.',
      );
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
        });
      }),
    );
  }

  @Action(GameActions.UpdateInputText)
  updateInputText(ctx: StateContext<GameStateModel>, action: GameActions.UpdateInputText) {
    updateState(ctx, (state) => {
      state.textInput = action.text;
    });
  }
}
