import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { GameActions } from './game.actions';
import { updateState } from '../../../core/utils/ngxs';

export interface GameStateModel {
  app: string;
}

@State<GameStateModel>({
  name: 'app',
  defaults: {
    app: "I'm an app!",
  },
})
@Injectable()
export class GameState {
  @Action(GameActions.ChangeApp)
  changeApp(ctx: StateContext<GameStateModel>, action: GameActions.ChangeApp) {
    updateState(ctx, (state) => {
      state.app = action.app;
    });
  }
}
