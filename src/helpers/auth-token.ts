const LOCAL_STORAGE_TOKEN_KEY_NAME = 'auth-token';

type AuthToken = string;

export function getAuthToken(): AuthToken {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY_NAME);

  if (!token) {
    return '';
  }

  return token;
}

export function setAuthToken(token: AuthToken) {
  localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY_NAME, token);
}

export function clearAuthToken() {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY_NAME);
}
