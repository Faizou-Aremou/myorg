import { StartWebcam, StartWebcamVideoStream, StopAudioStream, StopVideoStream, StopWebcam } from './video.functions.types';

export const startWebcamVideoStream: StartWebcamVideoStream = async (
  getUserMediaConstraints
) => {
  return navigator.mediaDevices.getUserMedia(getUserMediaConstraints);
};

export const startWebcam: StartWebcam = async (
  htmlVideoElement,
  webcamVideoStream
) => {
  htmlVideoElement.srcObject = webcamVideoStream;
  return htmlVideoElement.play();
};

export const stopWebcam:StopWebcam = (webcamVideoStream) => {
  stopAudioStream(webcamVideoStream);
  stopVideoStream(webcamVideoStream);
}

 const stopAudioStream:StopAudioStream = (webcamVideoStream) => {
  webcamVideoStream.getTracks()[0].stop(); // audio
}

const stopVideoStream:StopVideoStream = (webcamVideoStream)=> {
  webcamVideoStream.getTracks()[1].stop(); // video
}
