import { SeekRangeValue } from './domain-objects/seek-range-value';

export type AdvanceMedia = (
  seekRangeValue: SeekRangeValue,
  htmlMediaElement: HTMLMediaElement
) => void;

export type ConvertMediaCurrentTimeToSeekRangeValue = (
  htmlMediaElement: HTMLMediaElement
) => SeekRangeValue;
export type VolumeChangeDown = (htmlMediaElement: HTMLMediaElement) => void;

export type VolumeChangeUp = (htmlMediaElement: HTMLMediaElement) => void;
