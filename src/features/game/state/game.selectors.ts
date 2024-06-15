import { Selector } from '@ngxs/store';
import { GameState, GameStateModel } from './game.state';

export class AppSelectors {
  @Selector([GameState])
  static App(app: GameStateModel) {
    return app.app;
  }
}
