import { Injectable } from '@angular/core';
import { catchError, exhaustMap, filter, map, mergeMap, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import {
  musicianExistsGuardActions,
  musicianListPageActions,
  musiciansApiActions,
} from '@musicians/actions';
import { musiciansSelectors } from '@musicians/state';
import { MusiciansService } from '@musicians/musicians.service';

@Injectable()
export class MusiciansApiEffects {
  readonly loadMusicians$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(musicianListPageActions.opened),
      exhaustMap(() => {
        return this.musiciansService.getAll().pipe(
          map((musicians) =>
            musiciansApiActions.musiciansLoadedSuccess({ musicians })
          ),
          catchError((error) =>
            of(musiciansApiActions.musiciansLoadedFailure({ error }))
          )
        );
      })
    );
  });

  readonly loadMusicianIfNotLoaded$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(musicianExistsGuardActions.entered),
      concatLatestFrom(({ musicianId }) =>
        this.store.select(musiciansSelectors.selectById(musicianId))
      ),
      filter(([, musician]) => !musician),
      mergeMap(([{ musicianId }]) => {
        return this.musiciansService.getById(musicianId).pipe(
          map((musician) =>
            musiciansApiActions.musicianLoadedSuccess({ musician })
          ),
          catchError((error) =>
            of(musiciansApiActions.musicianLoadedFailure({ error, musicianId }))
          )
        );
      })
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly musiciansService: MusiciansService
  ) {}
}
