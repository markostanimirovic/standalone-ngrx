import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { filter, map, Observable, race, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import {
  musicianExistsGuardActions,
  musiciansApiActions,
} from '@musicians/actions';
import { musiciansSelectors } from '@musicians/state';

@Injectable({
  providedIn: 'root',
})
export class MusicianExistsGuard implements CanActivate {
  constructor(
    private readonly store: Store,
    private readonly actions$: Actions,
    private readonly router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<true | UrlTree> | UrlTree {
    const musicianId = route.params['id'];
    const allMusiciansUrl = this.router.parseUrl('/musicians');
    this.store.dispatch(musicianExistsGuardActions.entered({ musicianId }));

    return this.hasMusicianInStore(musicianId).pipe(
      map((musicianExists) => musicianExists || allMusiciansUrl),
      take(1)
    );
  }

  private hasMusicianInStore(musicianId: string): Observable<boolean> {
    return race(
      this.store.select(musiciansSelectors.selectById(musicianId)).pipe(
        filter(Boolean),
        map(() => true)
      ),
      this.actions$.pipe(
        ofType(musiciansApiActions.musicianLoadedFailure),
        filter((action) => action.musicianId === musicianId),
        map(() => false)
      )
    );
  }
}
