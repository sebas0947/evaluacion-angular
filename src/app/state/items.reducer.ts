import { createAction, props, createReducer, on } from '@ngrx/store';

export interface Item { id: number; name: string; votes: number; }

export const addItem = createAction('[List] Add', props<{ name: string }>());
export const removeItem = createAction('[List] Remove', props<{ id: number }>());
export const voteUp = createAction('[List] Up', props<{ id: number }>());
export const voteDown = createAction('[List] Down', props<{ id: number }>());

export const itemsReducer = createReducer(
  [] as Item[],
  on(addItem, (state, { name }) => [...state, { id: Date.now(), name, votes: 0 }]),
  on(removeItem, (state, { id }) => state.filter(i => i.id !== id)),
  on(voteUp, (state, { id }) => state.map(i => i.id === id ? {...i, votes: i.votes + 1} : i)),
  on(voteDown, (state, { id }) => state.map(i => i.id === id ? {...i, votes: i.votes - 1} : i))
);
