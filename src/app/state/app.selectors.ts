import { Selector } from '@ngxs/store';
import { AppState, AppStateModel } from './app.state';

export class AppSelectors {
  @Selector([AppState])
  static App(app: AppStateModel) {
    return app.app;
  }
}
