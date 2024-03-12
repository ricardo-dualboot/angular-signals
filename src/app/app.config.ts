import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore } from '@ngrx/store';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideHttpClient(withFetch()),
    provideAnimations(),
    provideRouter(routes, withViewTransitions()),
    provideClientHydration(),
    provideToastr({ timeOut: 900, preventDuplicates: true }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    })
  ],
};
