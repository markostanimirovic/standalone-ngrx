import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <a routerLink="/" style="margin-right: 1rem">Home</a>
      <a routerLink="/musicians">Musicians</a>
    </header>
  `,
  standalone: true,
  imports: [RouterModule],
})
export class HeaderComponent {}
