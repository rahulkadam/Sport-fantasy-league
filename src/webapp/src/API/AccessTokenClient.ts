const TOKEN_KEY = 'fantasy_access_token';

export function getBearerToken() {
  let token = localStorage.getItem(TOKEN_KEY);
  token = 'Bearer ' + token;
  return token;
}

export function setAccessToken(token: any) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getAccessToken() {
  localStorage.getItem(TOKEN_KEY);
}

export function removeAccessToken() {
  localStorage.removeItem(TOKEN_KEY);
}
