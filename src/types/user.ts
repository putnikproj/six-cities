import { AuthToken } from '../helpers/auth-token';

export type User = {
  avatarUrl: string;
  id: number | string;
  isPro: boolean;
  name: string;
};

export type AuthUser = User & {
  email: string;
};

export type AuthUserWithToken = AuthUser & { token: AuthToken };

export type UserLogin = {
  email: string;
  password: string;
};
