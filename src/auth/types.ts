export type UserAccount = {
  name: string;
  email: string;
  password: string;
  bio?: string;
  favoriteTeam?: string;
  notifyGames?: boolean;
  notifyNews?: boolean;
};

export type ProfileUpdate = {
  name: string;
  bio?: string;
  favoriteTeam?: string;
  notifyGames?: boolean;
  notifyNews?: boolean;
};

export type AuthResult =
  | { ok: true; user: UserAccount }
  | { ok: false; message: string };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}
