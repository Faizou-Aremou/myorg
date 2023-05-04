import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AutoLoadingFileComponent } from './components/auto-loading-file/auto-loading-file.component';

export const appRoutes: Route[] = [{ path: '', pathMatch: 'full', redirectTo: 'auto-loading' },
{ path: 'auto-loading', component: AutoLoadingFileComponent },];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }