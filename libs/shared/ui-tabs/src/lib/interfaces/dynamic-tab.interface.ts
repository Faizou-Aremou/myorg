import { StaticTab } from './static-tab.interface';
export interface DynamicTab<T> extends StaticTab {
  contentInfos: T;
}