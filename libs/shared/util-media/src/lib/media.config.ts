export const mediaConfig: MediaConfig = {
  mediaScale: 100,
  minimumVolumeChangeDown: 0,
  maximumVolumeChangeDown: 0,
};

export type MediaConfig = {
  readonly mediaScale: number;
  readonly minimumVolumeChangeDown: number;
  readonly maximumVolumeChangeDown: number;
};
