import { createSelector } from '@ngrx/store';
import { selectRouteParam } from '@core/router/router.selectors';
import { musiciansFeature } from './musicians.reducer';

export const {
  selectMusiciansState,
  selectIds,
  selectEntities,
  selectAll,
  selectIsLoading,
} = musiciansFeature;

export const selectFromRoute = createSelector(
  selectEntities,
  selectRouteParam('id'),
  (entities, id) => (id ? entities[id] : undefined)
);

export const selectById = (id: string) =>
  createSelector(selectEntities, (entities) => entities[id]);
