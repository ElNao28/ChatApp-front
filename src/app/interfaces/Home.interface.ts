export interface Home {
  lastMessage: LastMessage;
  chat: Chat;
  id: string;
  createOn: Date;
}

export interface Chat {
  id: string;
  title: string;
  user: User;
}

export interface User {
  id: string;
  username: string;
  password: string;
  lastConection: Date;
  status: 'online' | 'offline';
}

export interface LastMessage {
  id: string;
  message: string;
  createdAt: string;
}
