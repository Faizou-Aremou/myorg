import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedUiProductsGridModule } from '@myorg/shared/ui-products-grid';
import { SharedUiTabsModule } from '@myorg/shared/ui-tabs';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [BrowserModule, SharedUiTabsModule, SharedUiProductsGridModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
