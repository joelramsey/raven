import { UserData } from 'angular2-token/angular2-token';

export interface User {
  email: string;
  password: string;
  passwordConfirmation?: string;
}

export interface UserDetails extends UserData {
  id: number;
  uid: string;
  firstName?: string;
  lastName?: string;
  username?: string;
}
