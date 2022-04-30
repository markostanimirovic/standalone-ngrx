import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';
import { Musician } from './musician.model';

const musicians: Musician[] = [
  { id: '1', name: 'Eric Clapton', instrument: 'guitar' },
  { id: '2', name: 'Ringo Starr', instrument: 'drums' },
  { id: '3', name: 'Sting', instrument: 'bass' },
  { id: '4', name: 'Charlie Watts', instrument: 'drums' },
  { id: '5', name: 'Stevie Ray Vaughan', instrument: 'guitar' },
];

@Injectable({
  providedIn: 'root',
})
export class MusiciansService {
  getAll(): Observable<Musician[]> {
    return of(musicians).pipe(delay(1000));
  }

  getById(id: string): Observable<Musician> {
    const musician = musicians.find((m) => m.id === id);

    return musician
      ? of(musician).pipe(delay(500))
      : throwError(() => `Musician with id ${id} does not exist!`);
  }
}
