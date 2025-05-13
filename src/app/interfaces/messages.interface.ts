import { User } from "./user.interface";

export interface Message{
  id:string;
  message:string;
  user:User
}
export interface SendMessage {
  from:string;
  to:string;
  message:string;
  chatId?:string;
}
