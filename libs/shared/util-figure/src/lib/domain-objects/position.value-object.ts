export type Position = {
  readonly clientX: ClientX;
  readonly clientY: ClientY;
};

export type ClientX = number & { __brand: 'ClientX' };

export function createClientX(clientX: number): ClientX {
  return clientX as ClientX;
}
export type ClientY = number & { __brand: 'ClientY' };

export function createClientY(clientX: number): ClientY {
  return clientX as ClientY;
}
