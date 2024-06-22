import { Component, computed, input } from '@angular/core';
import { WordToWrite } from '../../state/game';

@Component({
  selector: 'app-words-to-write',
  standalone: true,
  imports: [],
  templateUrl: './words-to-write.component.html',
  styleUrl: './words-to-write.component.scss',
})
export class WordsToWriteComponent {
  public wordsToWrite = input.required<WordToWrite[]>();

  public readonly waitingWordsToWriteString = 'Ja to lubie mortadele...';
}
