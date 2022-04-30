import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { musicianListPageActions } from '@musicians/actions';
import { musiciansSelectors } from '@musicians/state';

@Component({
  template: `
    <h2>Musicians</h2>

    <p *ngIf="isLoading$ | async; else musicianList">Loading...</p>

    <ng-template #musicianList>
      <ul>
        <li *ngFor="let musician of musicians$ | async">
          <a [routerLink]="['/musicians', musician.id]">{{ musician.name }}</a>
        </li>
      </ul>
    </ng-template>
  `,
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class MusicianListComponent implements OnInit {
  readonly musicians$ = this.store.select(musiciansSelectors.selectAll);
  readonly isLoading$ = this.store.select(musiciansSelectors.selectIsLoading);

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(musicianListPageActions.opened());
  }
}
