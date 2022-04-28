import axios from 'axios';
import { getAuthToken } from './auth-token';

const URL = 'https://8.react.pages.academy/six-cities';
const HEADER_TOKEN_KEY = 'x-token';
const TIMEOUT = 5000;

export function createAPI() {
  const api = axios.create({
    baseURL: URL,
    timeout: TIMEOUT,
  });

  // Interceptor which adds auth token
  api.interceptors.request.use((config) => {
    const token = getAuthToken();

    if (token !== '') {
      config.headers[HEADER_TOKEN_KEY] = token;
    }

    return config;
  });

  return api;
}
