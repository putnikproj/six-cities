import axios from 'axios';

const URL = 'https://8.react.pages.academy/six-cities';
const TIMEOUT = 5000;

export function createAPI() {
  const api = axios.create({
    baseURL: URL,
    timeout: TIMEOUT,
  });

  return api;
}
