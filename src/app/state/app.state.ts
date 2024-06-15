import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { AppActions } from './app.actions';
import { produce } from 'immer';
import { updateState } from '../../core/utils/ngxs';

export interface AppStateModel {
  app: string;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    app: "I'm an app!",
  },
})
@Injectable()
export class AppState {
  @Action(AppActions.ChangeApp)
  changeApp(ctx: StateContext<AppStateModel>, action: AppActions.ChangeApp) {
    updateState(ctx, (state) => {
      state.app = action.app;
    });

    // // produce(ctx.getState(), (draftState) => {
    // //   draftState.app = action.app;
    // // });
  }
}
