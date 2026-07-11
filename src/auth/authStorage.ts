import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { AuthResult, ProfileUpdate, UserAccount, isValidEmail } from './types';

const prefix = Platform.OS === 'ios' ? 'astream' : 'gstream';
const ACCOUNTS_KEY = `${prefix}_accounts`;
const SESSION_KEY = `${prefix}_session_email`;

async function loadAccounts(): Promise<UserAccount[]> {
  const raw = await AsyncStorage.getItem(ACCOUNTS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as UserAccount[];
  } catch {
    return [];
  }
}

async function saveAccounts(accounts: UserAccount[]): Promise<void> {
  await AsyncStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

export async function getSessionEmail(): Promise<string | null> {
  return AsyncStorage.getItem(SESSION_KEY);
}

export async function getCurrentUser(): Promise<UserAccount | null> {
  const email = await getSessionEmail();
  if (!email) return null;
  const accounts = await loadAccounts();
  return accounts.find((a) => a.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export async function signUp(
  name: string,
  email: string,
  password: string
): Promise<AuthResult> {
  const trimmedName = name.trim();
  const trimmedEmail = email.trim().toLowerCase();

  if (trimmedName.length < 2) {
    return { ok: false, message: 'Name must be at least 2 characters' };
  }
  if (!isValidEmail(trimmedEmail)) {
    return { ok: false, message: 'Enter a valid email address' };
  }
  if (password.length < 6) {
    return { ok: false, message: 'Password must be at least 6 characters' };
  }

  const accounts = await loadAccounts();
  if (accounts.some((a) => a.email.toLowerCase() === trimmedEmail)) {
    return { ok: false, message: 'An account with this email already exists' };
  }

  const user: UserAccount = {
    name: trimmedName,
    email: trimmedEmail,
    password,
    bio: '',
    favoriteTeam: '',
    notifyGames: true,
    notifyNews: false,
  };
  accounts.push(user);
  await saveAccounts(accounts);
  await AsyncStorage.setItem(SESSION_KEY, trimmedEmail);
  return { ok: true, user };
}

export async function login(email: string, password: string): Promise<AuthResult> {
  const trimmedEmail = email.trim().toLowerCase();

  if (!isValidEmail(trimmedEmail)) {
    return { ok: false, message: 'Enter a valid email address' };
  }
  if (!password) {
    return { ok: false, message: 'Password is required' };
  }

  const accounts = await loadAccounts();
  const user = accounts.find((a) => a.email.toLowerCase() === trimmedEmail);
  if (!user) {
    return { ok: false, message: 'No account found with this email' };
  }
  if (user.password !== password) {
    return { ok: false, message: 'Incorrect password' };
  }

  await AsyncStorage.setItem(SESSION_KEY, user.email);
  return { ok: true, user };
}

export async function logout(): Promise<void> {
  await AsyncStorage.removeItem(SESSION_KEY);
}

export async function updateProfile(
  update: ProfileUpdate
): Promise<AuthResult> {
  const trimmedName = update.name.trim();
  if (trimmedName.length < 2) {
    return { ok: false, message: 'Name must be at least 2 characters' };
  }

  const email = await getSessionEmail();
  if (!email) {
    return { ok: false, message: 'Not signed in' };
  }

  const accounts = await loadAccounts();
  const index = accounts.findIndex(
    (a) => a.email.toLowerCase() === email.toLowerCase()
  );
  if (index < 0) {
    return { ok: false, message: 'Account not found' };
  }

  const next: UserAccount = {
    ...accounts[index],
    name: trimmedName,
    bio: (update.bio ?? '').trim(),
    favoriteTeam: (update.favoriteTeam ?? '').trim(),
    notifyGames: update.notifyGames ?? accounts[index].notifyGames ?? true,
    notifyNews: update.notifyNews ?? accounts[index].notifyNews ?? false,
  };
  accounts[index] = next;
  await saveAccounts(accounts);
  return { ok: true, user: next };
}
