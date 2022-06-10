import {
  ImportedNgModuleProviders,
  importProvidersFrom,
  InjectionToken,
  Type,
} from '@angular/core';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  FeatureSlice,
  RootStoreConfig,
  StoreConfig,
  StoreModule,
} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  StoreRouterConfig,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { StoreDevtoolsConfig, StoreDevtoolsModule } from '@ngrx/store-devtools';

// @ngrx/store
export function provideStore<T, V extends Action = Action>(
  reducers?: ActionReducerMap<T, V> | InjectionToken<ActionReducerMap<T, V>>,
  config?: RootStoreConfig<T, V>
): ImportedNgModuleProviders {
  return importProvidersFrom(
    StoreModule.forRoot(reducers ?? ({} as ActionReducerMap<T, V>), config)
  );
}

export function provideStoreFeature<T, V extends Action = Action>(
  featureName: string,
  reducers: ActionReducerMap<T, V> | InjectionToken<ActionReducerMap<T, V>>,
  config?: StoreConfig<T, V> | InjectionToken<StoreConfig<T, V>>
): ImportedNgModuleProviders;
export function provideStoreFeature<T, V extends Action = Action>(
  featureName: string,
  reducer: ActionReducer<T, V> | InjectionToken<ActionReducer<T, V>>,
  config?: StoreConfig<T, V> | InjectionToken<StoreConfig<T, V>>
): ImportedNgModuleProviders;
export function provideStoreFeature<T, V extends Action = Action>(
  feature: FeatureSlice<T, V>
): ImportedNgModuleProviders;
export function provideStoreFeature<T, V extends Action = Action>(
  nameOrFeature: string | FeatureSlice<T, V>,
  reducers?:
    | ActionReducerMap<T, V>
    | ActionReducer<T, V>
    | InjectionToken<ActionReducer<T, V>>
    | InjectionToken<ActionReducerMap<T, V>>,
  config?: StoreConfig<T, V> | InjectionToken<StoreConfig<T, V>>
): ImportedNgModuleProviders {
  return importProvidersFrom(
    StoreModule.forFeature(nameOrFeature as any, reducers as any, config)
  );
}

// @ngrx/effects
export function provideEffects(
  rootEffects?: Type<any>[]
): ImportedNgModuleProviders {
  return importProvidersFrom(EffectsModule.forRoot(rootEffects));
}

export function provideFeatureEffects(
  featureEffects: Type<any>[]
): ImportedNgModuleProviders {
  return importProvidersFrom(EffectsModule.forFeature(featureEffects));
}

// @ngrx/router-store
export function provideRouterStore(
  config?: StoreRouterConfig
): ImportedNgModuleProviders {
  return importProvidersFrom(StoreRouterConnectingModule.forRoot(config));
}

// @ngrx/store-devtools
export function provideStoreDevtools(
  config?: StoreDevtoolsConfig
): ImportedNgModuleProviders {
  return importProvidersFrom(StoreDevtoolsModule.instrument(config));
}
