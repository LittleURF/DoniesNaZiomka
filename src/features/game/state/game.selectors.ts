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
    return createSelector([GameSelectors.WordsToWrite], (wordsToWrite) =>
      wordsToWrite.find((w) => w.status === 'InProgress'),
    );
  }

  static Progress() {
    return createSelector([GameSelectors.WordsToWrite], (wordsToWrite) => {
      const max = wordsToWrite.length;
      const finished = wordsToWrite.filter((w) => w.status === 'Finished').length;

      return Math.floor((finished / max) * 100);
    });
  }

  @Selector([GameState])
  static TextInput(game: GameStateModel) {
    return game.textInput;
  }
}
