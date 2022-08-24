import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { httpInterceptorProviders } from './interceptors';

@NgModule({
  imports: [CommonModule],
  providers:[httpInterceptorProviders]
})
export class SharedHttpServicesModule {}
