export interface LoginUser extends NewUser {}

export interface NewUser {
  username: string;
  password: string;
}

export interface CreateUserResponse {
  id: string;
  username: string;
  password: string;
}

export interface UserDecoded extends NewUser {
  id: string;
}

export interface User extends CreateUserResponse {
  lastConnection: string;
  status: 'online' | 'offline';
}
