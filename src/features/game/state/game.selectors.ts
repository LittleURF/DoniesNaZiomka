import { Selector } from '@ngxs/store';
import { GameState, GameStateModel } from './game.state';

export class GameSelectors {
  @Selector([GameState])
  static Status(game: GameStateModel) {
    return game.status;
  }

  @Selector([GameState])
  static StartDateIso(game: GameStateModel) {
    return game.startDateIso;
  }

  @Selector([GameState])
  static TextToWrite(game: GameStateModel) {
    return game.textToWrite;
  }
}
