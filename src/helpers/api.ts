import axios, { AxiosResponse } from 'axios';
import camelcaseKeys from 'camelcase-keys';

import { getAuthToken } from './auth-token';
import { LoadingStatus } from './enum';

const BASE_SERVER_URL = 'https://8.react.pages.academy/six-cities';
const HEADER_TOKEN_KEY = 'x-token';
const TIMEOUT = 5000;

// Main API module

export const api = axios.create({
  baseURL: BASE_SERVER_URL,
  timeout: TIMEOUT,
});

// Interceptor which adds auth token
api.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token !== '' && config.headers) {
    config.headers[HEADER_TOKEN_KEY] = token;
  }

  return config;
});

// Interceptor which adapts data from server from snake_case_keys to camelCaseKeys
api.interceptors.response.use((response) => ({
  ...response,
  data: camelcaseKeys(response.data, { deep: true }),
}));

export type APIData<DataType = unknown> = {
  loadingStatus: LoadingStatus;
  error?: APIError;
  data: DataType;
};

// Error handling

const UNTERNAL_ERROR_MESSAGE = 'Uknown error in making request';

export type APIError<DataType = unknown> = {
  message: string;
  response?: Pick<AxiosResponse<DataType>, 'status' | 'statusText' | 'data'>;
};

export const serializeAPIError = (error: unknown): APIError => {
  // Internal error
  if (!axios.isAxiosError(error)) {
    return {
      message: UNTERNAL_ERROR_MESSAGE,
    };
  }

  // The request was made and the server responded with a status code
  if (error.response) {
    const { data, status, statusText } = error.response;

    return {
      message: error.message,
      response: { data, status, statusText },
    };
  }

  // Error in making request or server isn't responding
  return {
    message: error.message,
  };
};
