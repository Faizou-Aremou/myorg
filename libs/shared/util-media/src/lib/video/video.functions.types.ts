import { WebcamVideoStream } from './domain-objects/webcam-video-stream';

export type StartWebcamVideoStream = (
  mediaStreamConstraints: MediaStreamConstraints
) => Promise<MediaStream>;

export type StartWebcam = (
  htmlVideoElement: HTMLVideoElement,
  webcamVideoStream: WebcamVideoStream
) => Promise<unknown>;

export type StopWebcam = (webcamVideoStream: WebcamVideoStream) => void;

export type StopAudioStream = (
  webcamVideoStream: WebcamVideoStream
) => void;

export type StopVideoStream = (
  webcamVideoStream: WebcamVideoStream
) => void;
