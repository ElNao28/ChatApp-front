export interface SendMessage {
  from: string;
  to: string;
  message: string;
  chatId?: string;
}
export interface ChatUser {
  id: string;
  createOn: string;
  messages: Message[];
}

export interface Message {
  id: string;
  message: string;
  createdAt: string;
  user: User;
}

export interface User {
  id: string;
  username: string;
  password: string;
  lastConection: string | null;
  status: Status;
}

export enum Status {
  Offline = 'offline',
  Online = 'online',
}
