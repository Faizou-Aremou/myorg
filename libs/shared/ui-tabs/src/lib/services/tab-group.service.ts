import { DynamicTab } from "../interfaces/dynamic-tab.interface";
import { StaticTab } from "../interfaces/static-tab.interface";
import { TabGroup } from "../interfaces/tab-group.interface";


/**
 * TabGroup stands exactly like multi service instance, the same things can be done in multi service instance implementation
 */
export class SimpleTabGroup<T> implements TabGroup<T>{
  private _staticTabs: Array<StaticTab> = [];
  private _dynamicTabs: Array<DynamicTab<T>> = [];
  
  public get staticTabs(): Array<StaticTab> {
      return this._staticTabs;
  } 
  public get dynamicTabs(): Array<DynamicTab<T>> {
     return this._dynamicTabs;
  }

  constructor(staticTabs: Array<Omit<StaticTab, 'tabNumber'>>) {
    this._staticTabs = staticTabs.map((tab, i) => {
      return { ...tab, tabNumber: i };
    });
  }
  public selectedTab = 0;

  public addTabDynamically(dynamicTab: Omit<DynamicTab<T>, 'tabNumber'>): void {
   const existingTab = this._dynamicTabs.find((tab)=> tab.label=== dynamicTab.label)
   if (existingTab!== undefined) {
       this.selectedTab = existingTab.tabNumber;
   } else {
    this._dynamicTabs = [
      ...this._dynamicTabs,
      { ...dynamicTab, tabNumber: this.lastTabNumber()},
    ];
    this.selectedTab = this.lastTabNumber();
   }
  }

  public deleteTab(tabNumber: number): void {
      this._dynamicTabs = this._dynamicTabs.filter(
        (tab, index) => index !== tabNumber
      );

      const tabsUpperDeleteTab = this._dynamicTabs.slice(
        tabNumber
      );
      const tabsUpperDeleteTabNumberTabUpdated = tabsUpperDeleteTab.map(
        (tab) => {
          return { ...tab, index: tab.tabNumber - 1 };
        }
      );
      this._dynamicTabs = [
        ...this._dynamicTabs.slice(0, tabNumber),
        ...tabsUpperDeleteTabNumberTabUpdated,
      ];
      this.selectedTab =
      this.isLastTabOnDynamicTabs(tabNumber)
          ? this.tabNumber(tabNumber) -1
          : this.tabNumber(tabNumber)
  }

  private isLastTabOnDynamicTabs(tabNumber: number): boolean {
       return tabNumber === this._dynamicTabs.length;
  }

  private lastTabNumber():number{
    return this._staticTabs.length + this._dynamicTabs.length;
  }

  private tabNumber(tabNumber:number): number{
    return this._staticTabs.length + tabNumber
  }
}