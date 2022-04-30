import { createFeature, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Musician } from '@musicians/musician.model';
import {
  musicianListPageActions,
  musiciansApiActions,
} from '@musicians/actions';

interface State extends EntityState<Musician> {
  isLoading: boolean;
}

const adapter = createEntityAdapter<Musician>();
const initialState: State = adapter.getInitialState({ isLoading: false });

const reducer = createReducer(
  initialState,
  on(musicianListPageActions.opened, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(musiciansApiActions.musiciansLoadedSuccess, (state, { musicians }) =>
    adapter.setAll(musicians, {
      ...state,
      isLoading: false,
    })
  ),
  on(musiciansApiActions.musiciansLoadedFailure, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(musiciansApiActions.musicianLoadedSuccess, (state, { musician }) =>
    adapter.setOne(musician, state)
  )
);

const feature = createFeature({ name: 'musicians', reducer });
const { selectAll } = adapter.getSelectors(feature.selectMusiciansState);

export const musiciansFeature = { ...feature, selectAll };
