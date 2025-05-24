import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './core/app.reducer';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      StoreModule.forRoot({ app: appReducer }),
      ModalModule.forRoot()
    ),
    provideHttpClient(),
    provideToastr(),
    provideAnimations()
  ]
};