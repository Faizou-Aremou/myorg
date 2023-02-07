import { SeekRangeValue } from '../domain-objects/seek-range-value';

export class MediaAvanced {
  readonly details: {
    readonly seekRangeValue: SeekRangeValue;
  };
}
