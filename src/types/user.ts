export type User = {
  avatarUrl: string;
  id: number | string;
  isPro: boolean;
  name: string;
};

export type AuthUser = User & {
  email: string;
};
