import { DynamicTab } from "../types/dynamic-tab.model";
import { StaticTab } from "../types/static-tab.model";


export abstract class TabGroupInterface<T> {
    abstract staticTabs: Array<StaticTab>; 
    abstract dynamicTabs: Array<DynamicTab<T>>;
    abstract selectedTab:number;  
    abstract addTabDynamically(dynamicTab: Omit<DynamicTab<T>, 'tabNumber'>): void;
    abstract deleteTab(tabNumber: number): void;
  }