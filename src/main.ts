import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routerReducer } from '@ngrx/router-store';
import {
  configureEffects,
  configureRouterStore,
  configureStore,
  configureStoreDevtools,
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
    configureStore({ router: routerReducer }),
    configureRouterStore(),
    configureStoreDevtools(),
    configureEffects(),
  ],
}).catch((err) => console.error(err));
