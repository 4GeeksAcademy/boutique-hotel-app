const isDev = process.env.NODE_ENV === 'development';

const logger = {
  info: (...args) => {
    if (isDev) console.info('[INFO]', ...args);
  },
  error: (...args) => {
    if (isDev) console.error('[ERROR]', ...args);
  },
  warn: (...args) => {
    if (isDev) console.warn('[WARN]', ...args);
  },
  debug: (...args) => {
    if (isDev) console.debug('[DEBUG]', ...args);
  },
  api: {
    request: (config) => {
      if (isDev) {
        console.group('API Request');
        console.log('URL:', config.url);
        console.log('Method:', config.method);
        console.log('Headers:', config.headers);
        console.log('Data:', config.data);
        console.groupEnd();
      }
    },
    response: (response) => {
      if (isDev) {
        console.group('API Response');
        console.log('URL:', response.config.url);
        console.log('Status:', response.status);
        console.log('Data:', response.data);
        console.groupEnd();
      }
    },
    error: (error) => {
      if (isDev) {
        console.group('API Error');
        console.error('URL:', error.config?.url);
        console.error('Status:', error.response?.status);
        console.error('Data:', error.response?.data);
        console.error('Message:', error.message);
        console.groupEnd();
      }
    }
  }
};

export default logger; 