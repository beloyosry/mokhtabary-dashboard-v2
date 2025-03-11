// Theme configuration with color palette from design system
export const theme = {
  colors: {
    // Primary palette
    primary: {
      50: '#fef2f2',  // rgb(250, 233, 233)
      100: '#fadcdc',  // rgb(239, 187, 187)
      200: '#f8b9b9',  // rgb(232, 155, 155)
      300: '#ed8e7b',  // rgb(221, 109, 112)
      400: '#e65f54',  // rgb(214, 81, 84)
      500: '#dc2626',  // rgb(204, 37, 41)
      600: '#ba2225',  // rgb(188, 34, 37)
      700: '#911a14',  // rgb(145, 26, 29)
      800: '#7d1d17',  // rgb(112, 20, 23)
      900: '#5e1011',  // rgb(86, 16, 17)
    },
    // Dark/neutral palette
    dark: {
      50: '#f6f6f6',  // rgb(231, 231, 231)
      100: '#e0e0e0',  // rgb(192, 192, 192)
      200: '#b6b6b6',  // rgb(146, 146, 146)
      300: '#9e9e9e',  // rgb(96, 96, 96)
      400: '#686868',  // rgb(65, 65, 65)
      500: '#373737',  // rgb(13, 13, 13)
      600: '#1d1d1d',  // rgb(16, 16, 16)
      700: '#141414',  // rgb(13, 13, 13)
      800: '#0a0a0a',  // rgb(10, 10, 10)
      900: '#070707',  // rgb(6, 6, 7)
    },
    // Additional UI colors
    background: {
      light: '#ffffff',
      dark: '#121212',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#666666',
      disabled: '#9e9e9e',
      inverse: '#ffffff',
    },
    border: {
      light: '#e0e0e0',
      medium: '#b6b6b6',
      dark: '#666666',
    },
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
  // Provide easy access to common combinations
  ui: {
    primary: {
      background: '#dc2626', // primary-500
      hoverBackground: '#ba2225', // primary-600
      activeBackground: '#911a14', // primary-700
      text: '#ffffff',
    },
    secondary: {
      background: '#f6f6f6', // dark-50
      hoverBackground: '#e0e0e0', // dark-100
      activeBackground: '#b6b6b6', // dark-200
      text: '#1a1a1a',
    },
  }
};

// Helper function to easily access theme values in JSX
export function getThemeValue(path: string): string {
  const keys = path.split('.');
  let value: any = theme;
  
  for (const key of keys) {
    if (value && value[key] !== undefined) {
      value = value[key];
    } else {
      return '';
    }
  }
  
  return value;
}

// Tailwind CSS class helper for common theme combinations
export const tw = {
  // Text color classes
  text: {
    primary: 'text-[#dc2626]', // primary-500
    muted: 'text-[#666666]', // text.secondary
    dark: 'text-[#1a1a1a]', // text.primary
    light: 'text-[#ffffff]', // text.inverse
  },
  // Background color classes
  bg: {
    primary: {
      50: 'bg-[#fef2f2]',
      100: 'bg-[#fadcdc]',
      200: 'bg-[#f8b9b9]',
      300: 'bg-[#ed8e7b]',
      400: 'bg-[#e65f54]',
      500: 'bg-[#dc2626]',
      600: 'bg-[#ba2225]',
      700: 'bg-[#911a14]',
      800: 'bg-[#7d1d17]',
      900: 'bg-[#5e1011]',
    },
    dark: {
      50: 'bg-[#f6f6f6]',
      100: 'bg-[#e0e0e0]',
      200: 'bg-[#b6b6b6]',
      300: 'bg-[#9e9e9e]',
      400: 'bg-[#686868]',
      500: 'bg-[#373737]',
      600: 'bg-[#1d1d1d]',
      700: 'bg-[#141414]',
      800: 'bg-[#0a0a0a]',
      900: 'bg-[#070707]',
    }
  },
  // Border color classes
  border: {
    primary: 'border-[#dc2626]',
    light: 'border-[#e0e0e0]',
    medium: 'border-[#b6b6b6]',
    dark: 'border-[#666666]',
  }
};
