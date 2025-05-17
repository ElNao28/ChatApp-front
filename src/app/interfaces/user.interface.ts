export interface NewUser {
  username: string;
  password: string;
}
export interface LoginUser extends NewUser {}

export interface CreateUserResponse {
  id: string;
  username: string;
  password: string;
}

export interface UserDecoded extends NewUser {
  id: string;
}
