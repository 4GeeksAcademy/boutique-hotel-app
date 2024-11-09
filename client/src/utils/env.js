export const getApiUrl = () => {
  const url = process.env.REACT_APP_API_URL || 'http://localhost:5001';
  return url.endsWith('/') ? url.slice(0, -1) : url;
};

export const getApiPrefix = () => {
  const prefix = process.env.REACT_APP_API_PREFIX || '/api';
  return prefix.startsWith('/') ? prefix : `/${prefix}`;
};

export const isDevelopment = process.env.NODE_ENV === 'development';