export const API_CONFIG = {
    BASE_URL: process.env.REACT_APP_API_URL,
    API_PREFIX: process.env.REACT_APP_API_PREFIX,
    ENDPOINTS: {
        ROOMS: '/rooms',
        AUTH: {
            LOGIN: '/auth/login',
            REGISTER: '/auth/register',
            ME: '/auth/me'
        },
        BOOKINGS: {
            CREATE: '/bookings',
            LIST: '/bookings/user',
            DETAILS: (id) => `/bookings/${id}`,
            CANCEL: (id) => `/bookings/${id}/cancel`
        }
    }
}; 