import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsRouterPlugin } from '@ngxs/router-plugin';

import { routes } from './app.routes';
import { provideStore } from '@ngxs/store';
import { GameState } from './features/game/state/game.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore([GameState]),
    withNgxsRouterPlugin(),
    withNgxsReduxDevtoolsPlugin(),
    withNgxsLoggerPlugin(),
  ],
};