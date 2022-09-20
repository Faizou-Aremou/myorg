import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabGroupComponent } from './components/tab-group/tab-group.component';
import { StaticTabsContentDirective } from './directives/static-tabs-content.directive';
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatIconModule} from '@angular/material/icon'; 

@NgModule({
  imports: [CommonModule, MatTabsModule, MatIconModule ],
  declarations: [TabGroupComponent, StaticTabsContentDirective],
  exports: [TabGroupComponent, StaticTabsContentDirective],
})
export class SharedUiTabsModule {}
