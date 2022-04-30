import { getSelectors as getRouterSelectors } from '@ngrx/router-store';

export const {
  selectRouteParam,
  selectRouteParams,
  selectQueryParam,
  selectQueryParams,
  selectRouteData,
} = getRouterSelectors();
