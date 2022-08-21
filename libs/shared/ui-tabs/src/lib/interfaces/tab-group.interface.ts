import { DynamicTab } from "./dynamic-tab.interface";
import { StaticTab } from "./static-tab.interface";

export abstract class TabGroup<T> {
    abstract staticTabs: Array<StaticTab>; 
    abstract dynamicTabs: Array<DynamicTab<T>>;
    abstract selectedTab:number;  
    abstract addTabDynamically(dynamicTab: Omit<DynamicTab<T>, 'tabNumber'>): void;
    abstract deleteTab(tabNumber: number): void;
  }