import { StateContext } from '@ngxs/store';
import { Draft, WritableDraft, produce } from 'immer';

export const updateState = <T>(ctx: StateContext<T>, update: (state: T) => void) => {
  const newState = produce(ctx.getState(), (draftState) => update(draftState as T));
  ctx.setState(newState);
};
