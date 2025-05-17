

export interface Message{
  id:string;
  message:string;
}
export interface SendMessage {
  from:string;
  to:string;
  message:string;
  chatId?:string;
}
