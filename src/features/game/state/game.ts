export interface WordToWrite {
  text: string;
  status: 'Pending' | 'InProgress' | 'Finished';
}

export const newWordToWrite = (text: string): WordToWrite => ({
  text,
  status: 'Pending',
});
