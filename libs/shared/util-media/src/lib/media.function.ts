import {
  AdvanceMedia,
  ConvertMediaCurrentTimeToSeekRangeValue,
  VolumeChangeDown,
  VolumeChangeUp,
} from './media.functions.types';

const mediaScale = 100;
const minimumVolumeChangeDown = 0;
const maximumVolumeChangeDown = 0;

export const advanceMedia: AdvanceMedia = (
  seekRangeValue,
  htmlMediaElement
) => {
  const mediaTime = (htmlMediaElement.duration * seekRangeValue) / mediaScale;
  htmlMediaElement.currentTime = mediaTime;
};

export const convertMediaCurrentTimeToSeekRangeValue: ConvertMediaCurrentTimeToSeekRangeValue =
  (htmlMediaElement) => {
    const scaledSeekRangeValue =
      (htmlMediaElement.currentTime * mediaScale) / htmlMediaElement.duration;
    return scaledSeekRangeValue;
  };

export const volumeChangeDown: VolumeChangeDown = (htmlMediaElement) => {
  if (htmlMediaElement.volume > minimumVolumeChangeDown) {
    htmlMediaElement.volume -= 0.1;
  }
};

export const volumeChangeUp: VolumeChangeUp = (htmlMediaElement) => {
  if (htmlMediaElement.volume < maximumVolumeChangeDown) {
    htmlMediaElement.volume += 0.1;
  }
};
