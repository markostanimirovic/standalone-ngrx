import { createAction, props } from '@ngrx/store';

export const entered = createAction(
  '[Musician Exists Guard] Can Activate Entered',
  props<{ musicianId: string }>()
);
