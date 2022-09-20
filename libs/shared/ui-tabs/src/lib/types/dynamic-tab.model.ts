import { StaticTab } from './static-tab.model';
export interface DynamicTab<T> extends StaticTab {
  contentInfos: T;
}