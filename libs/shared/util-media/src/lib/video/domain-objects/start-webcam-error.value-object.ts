export class StartWebcamError extends Error {
    constructor(...params:string[]) {
      super(...params);
      this.name = 'StartWebcamError';
    }
  }
  