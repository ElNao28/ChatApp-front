export interface Chats {
  id: string;
  title:string;
  chat: Chat;
}

export interface Chat {
  id: string;
  createOn: Date;
  messages: Message[];
}

export interface Message {
  id: string;
  message: string;
}
