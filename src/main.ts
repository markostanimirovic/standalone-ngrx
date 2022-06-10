import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routerReducer } from '@ngrx/router-store';
import {
  provideEffects,
  provideRouterStore,
  provideStore,
  provideStoreDevtools,
} from './app/standalone-ngrx';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { appRoutes } from './app/app.routes';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(appRoutes)),
    provideStore({ router: routerReducer }),
    provideRouterStore(),
    provideStoreDevtools(),
    provideEffects(),
  ],
}).catch((err) => console.error(err));
