import axios, { AxiosError } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { toast } from 'react-toastify';

import { getAuthToken } from './auth-token';

const BASE_SERVER_URL = 'https://8.react.pages.academy/six-cities';
const HEADER_TOKEN_KEY = 'x-token';
const TIMEOUT = 5000;

function createAPI() {
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

export const api = createAPI();

// Errors handling

type AnyError = unknown;

const defaultErrorHandlers = {
  notAxiosError: (error: AnyError) => undefined,
  otherError: (error: AxiosError) => toast.error('Something went wrong in making request'),
} as const;

type ErrorHandling =
  | {
      responseError?: (error: AxiosError) => void;
      requestError?: (error: AxiosError) => void;
    }
  | ((error: AxiosError) => void);

export function handleAPIError(
  error: AnyError,
  handler: ErrorHandling = (axiosError) => toast.error(axiosError.message),
) {
  if (!axios.isAxiosError(error)) {
    // SHOULD NEVER HAPPEN. Error not from axios
    defaultErrorHandlers.notAxiosError(error);
    return;
  }

  if (error.response) {
    // Server responded with a status code that falls out of the range of 2xx
    if (typeof handler === 'object') {
      handler.responseError && handler.responseError(error);
    } else {
      handler(error);
    }
    return;
  }

  if (error.request) {
    // The request was made but no response was received
    if (typeof handler === 'object') {
      handler.requestError && handler.requestError(error);
    } else {
      handler(error);
    }
    return;
  }

  // SHOULD NEVER HAPPEN. Something happened in setting up the request.
  defaultErrorHandlers.otherError(error);
}
