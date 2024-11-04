const theme = {
  colors: {
    primary: {
      light: '#4F46E5',  // Indigo
      DEFAULT: '#4338CA',
      dark: '#3730A3',
    },
    secondary: {
      light: '#10B981',  // Emerald
      DEFAULT: '#059669',
      dark: '#047857',
    },
    background: {
      light: '#F9FAFB',
      DEFAULT: '#F3F4F6',
      dark: '#1F2937',
    },
    text: {
      light: '#6B7280',
      DEFAULT: '#374151',
      dark: '#1F2937',
    },
    accent: {
      light: '#FCD34D',  // Amber
      DEFAULT: '#F59E0B',
      dark: '#D97706',
    }
  },
  fonts: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    serif: ['Merriweather', 'Georgia', 'serif'],
    display: ['Playfair Display', 'serif'],
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '4rem',
    '3xl': '6rem',
  },
  borderRadius: {
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '1rem',
    full: '9999px',
  },
};

export default theme;