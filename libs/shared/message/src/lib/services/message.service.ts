

export abstract class MessageService {
  abstract messages: string[];
  abstract add(message: string):void;
  abstract clear():void;
}
