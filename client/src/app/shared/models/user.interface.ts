export interface User {
  first_name?: string;
  last_name?: string;
  username?: string;
  email: string;
  password: string;
  passwordConfirmation?: string;
}