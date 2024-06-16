import { WordToWrite, newWordToWrite } from './game';

export const textToWordsToWrite = (text: string): WordToWrite[] => {
  const segmentsRaw = text.split(' ');
  const segments = segmentsRaw.map((s) => s + ' ');
  const lastSegment = segments.pop();
  const lastSegmentTrimmed = lastSegment?.trimEnd();
  segments.push(lastSegmentTrimmed!);

  return segments.map((s) => newWordToWrite(s));
};
