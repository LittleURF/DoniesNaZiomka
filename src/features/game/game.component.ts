import { Component, computed, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { GameActions } from './state/game.actions';
import { GameSelectors } from './state/game.selectors';
import { DateTime } from 'luxon';
import { CountdownPipe } from '../../shared/pipes/countdown.pipe';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs';

@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  imports: [CountdownPipe, CommonModule, ReactiveFormsModule],
})
export class GameComponent {
  private readonly store = inject(Store);
  public textInput = '';
  public readonly startDateIso = this.store.selectSignal(GameSelectors.StartDateIso);

  public readonly status = this.store.selectSignal(GameSelectors.Status);
  public readonly textToWrite = this.store.selectSignal(GameSelectors.TextToWrite);
  public readonly textToWriteAsString = computed(() =>
    this.textToWrite()
      .map((w) => w.text)
      .join(' '),
  );
  public readonly textInput$ = this.store.select(GameSelectors.TextInput);
  public readonly waitingText = 'Ja to lubie mortadele...';

  constructor() {
    this.textInput$.pipe(tap((textInput) => (this.textInput = textInput))).subscribe();
  }

  startGame() {
    this.store.dispatch(new GameActions.PrepareGame());
  }

  textInputChanged(event: Event) {
    if (event.target && 'value' in event.target && 'string' === typeof event.target.value) {
      this.store.dispatch(new GameActions.UpdateInputText(event.target.value));
    }
  }
}
