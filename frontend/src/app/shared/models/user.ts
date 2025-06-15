export interface User {
  id: string;
  email: string;
  name: string;
  address: string;
  token: string;
  isAdmin: boolean;
}

export interface UserRegister {
  name: string;
  email: string;
  password: string;
  address: string;
}