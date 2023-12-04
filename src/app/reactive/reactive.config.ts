import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { reactiveRoutes } from './reactive.routes';

export const reactiveConfig: ApplicationConfig = {
  providers: [provideRouter(reactiveRoutes)],
};
