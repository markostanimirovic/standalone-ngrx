import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { musiciansSelectors } from '@musicians/state';

@Component({
  template: `
    <h2>Musician Details</h2>

    <ng-container *ngIf="musician$ | async as musician">
      <p><b>Name:</b> {{ musician.name }}</p>
      <p><b>Instrument:</b> {{ musician.instrument }}</p>
    </ng-container>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class MusicianDetailsComponent {
  readonly musician$ = this.store.select(musiciansSelectors.selectFromRoute);

  constructor(private readonly store: Store) {}
}
