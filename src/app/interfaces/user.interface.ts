import { Chats } from "./chats.interface";

export interface NewUser {
  username: string;
  password: string;
}
export interface CreateUserResponse {
  id: string;
  username: string;
  password: string;
}
export interface LoginUser extends NewUser {}
export interface User extends NewUser {
  id:string;
  chats:Chats[]
}
