import { createAction, props } from '@ngrx/store';
import { Musician } from '../musician.model';

export const musiciansLoadedSuccess = createAction(
  '[Musicians API] Musicians Loaded Successfully',
  props<{ musicians: Musician[] }>()
);

export const musiciansLoadedFailure = createAction(
  '[Musicians API] Failed to Load Musicians',
  props<{ error: Error }>()
);

export const musicianLoadedSuccess = createAction(
  '[Musicians API] Musician Loaded Successfully',
  props<{ musician: Musician }>()
);

export const musicianLoadedFailure = createAction(
  '[Musicians API] Failed to Load Musician',
  props<{ error: Error; musicianId: string }>()
);
