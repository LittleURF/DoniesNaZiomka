import { Selector, createPropertySelectors, createSelector } from '@ngxs/store';
import { GameState, GameStateModel } from './game.state';
import { WordToWrite } from './game';

export class GameSelectors {
  static getSlices = createPropertySelectors<GameStateModel>(GameState);

  @Selector([GameState])
  static Status(game: GameStateModel) {
    return game.status;
  }

  @Selector([GameState])
  static StartDateIso(game: GameStateModel) {
    return game.startDateIso;
  }

  @Selector([GameState])
  static WordsToWrite(game: GameStateModel) {
    return game.wordsToWrite;
  }

  static CurrentWordToWrite() {
    return createSelector([GameSelectors.WordsToWrite], (textToWrite) =>
      textToWrite.find((w) => w.status === 'InProgress'),
    );
  }

  @Selector([GameState])
  static TextInput(game: GameStateModel) {
    return game.textInput;
  }
}
