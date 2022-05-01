import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { getAuthToken } from './auth-token';

const BASE_SERVER_URL = 'https://8.react.pages.academy/six-cities';
const HEADER_TOKEN_KEY = 'x-token';
const TIMEOUT = 5000;

export function createAPI() {
  const api = axios.create({
    baseURL: BASE_SERVER_URL,
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

  // Interceptor which adapts data from server from snake_case_keys to camelCaseKeys
  api.interceptors.response.use((response) => ({
    ...response,
    data: camelcaseKeys(response.data, { deep: true }),
  }));

  return api;
}
