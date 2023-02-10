export type Message = string & { __brand: 'Message' };

export function createMessage(message: string): Message {
  return message as Message;
}