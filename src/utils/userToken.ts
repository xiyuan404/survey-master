const TOKEN_KEY = 'USER_TOKEN'

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY)
}

export const removeToken = (): void => {
  return localStorage.removeItem(TOKEN_KEY)
}
