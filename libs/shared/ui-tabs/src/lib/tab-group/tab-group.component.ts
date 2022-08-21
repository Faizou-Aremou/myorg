import { Component, ContentChild, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { StaticTabsContentDirective } from '../directives/static-tabs-content.directive';
import { TabGroup } from '../interfaces/tab-group.interface';
import { DynamicTab} from '../interfaces/dynamic-tab.interface'


@Component({
  selector: 'myorg-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
})
export class TabGroupComponent<T> {
  @Input() tabGroup: TabGroup<T> | null = null;
  @ContentChildren(StaticTabsContentDirective) staticTabsContentRefs: QueryList<StaticTabsContentDirective> | null = null;
  @ContentChild("dynamicTabsContent", { static: false }) dynamicTabsContentRef: TemplateRef<unknown> | null = null;

  dynamicTrackBy<T>(index: number, dynamicTab: DynamicTab<T>) {
    return dynamicTab.label;
  }
}


