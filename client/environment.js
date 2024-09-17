export const API_URL = process.env.REACT_APP_API_URL;
export const ENV = process.env.REACT_APP_ENV;

export const isProduction = ENV === 'production';
export const isDevelopment = ENV === 'development';

export default {
  API_URL,
  ENV,
  isProduction,
  isDevelopment,
};