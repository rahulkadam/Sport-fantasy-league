const TOKEN_KEY = 'fantasy_access_token';

export function getBearerToken() {
  let token = localStorage.getItem(TOKEN_KEY);
  if (!token) return;
  token = 'Bearer ' + token;
  return token;
}

export function setAccessToken(token: any) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeAccessToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function isUserLogin() {
  const accessToken = getAccessToken();
  if (accessToken) {
    return true;
  }
  return false;
}
