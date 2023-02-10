
import { mediaConfig } from './media.config';
import {
  AdvanceMedia,
  ConvertMediaCurrentTimeToSeekRangeValue,
  VolumeChangeDown,
  VolumeChangeUp,
} from './media.functions.types';

export const advanceMedia: AdvanceMedia = (
  seekRangeValue,
  htmlMediaElement
) => {
  const mediaTime =
    (htmlMediaElement.duration * seekRangeValue) / mediaConfig.mediaScale;
  htmlMediaElement.currentTime = mediaTime;
};

export const convertMediaCurrentTimeToSeekRangeValue: ConvertMediaCurrentTimeToSeekRangeValue =
  (htmlMediaElement) => {
    const scaledSeekRangeValue =
      (htmlMediaElement.currentTime * mediaConfig.mediaScale) /
      htmlMediaElement.duration;
    return scaledSeekRangeValue;
  };

export const volumeChangeDown: VolumeChangeDown = (htmlMediaElement) => {
  if (htmlMediaElement.volume > mediaConfig.minimumVolumeChangeDown) {
    htmlMediaElement.volume -= 0.1;
  }
};

export const volumeChangeUp: VolumeChangeUp = (htmlMediaElement) => {
  if (htmlMediaElement.volume < mediaConfig.maximumVolumeChangeDown) {
    htmlMediaElement.volume += 0.1;
  }
};
