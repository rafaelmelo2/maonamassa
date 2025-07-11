// 🎨 Design System - Cores conforme especificação
export const theme = {
  colors: {
    primary: '#0057D9',
    secondary: '#FF8C00',
    text: '#333333',
    background: '#FFFFFF',
    success: '#28A745',
    error: '#DC3545',
    warning: '#FFC107',
    info: '#17A2B8',
    light: '#F8F9FA',
    dark: '#212529',
    muted: '#6C757D',
    
    // Gradientes
    gradients: {
      primary: 'linear-gradient(135deg, #0057D9 0%, #0041A3 100%)',
      secondary: 'linear-gradient(135deg, #FF8C00 0%, #FF6B00 100%)',
      success: 'linear-gradient(135deg, #28A745 0%, #20963D 100%)',
    },
    
    // Variações
    primary50: '#E8F2FF',
    primary100: '#C2DCFF',
    primary200: '#94C3FF',
    primary300: '#66AAFF',
    primary400: '#4797FF',
    primary500: '#0057D9',
    primary600: '#0051C7',
    primary700: '#0048B1',
    primary800: '#00409C',
    primary900: '#003177',
  },
  
  // 📱 Responsividade
  breakpoints: {
    xs: '480px',
    sm: '768px',
    md: '1024px',
    lg: '1280px',
    xl: '1440px',
  },
  
  // 🔤 Tipografia
  fonts: {
    primary: 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif',
    secondary: 'Roboto, sans-serif',
  },
  
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    md: '1rem',       // 16px - Base mínima conforme spec
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
  },
  
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    bold: 700,
  },
  
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
  
  // 📏 Espaçamentos
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '6rem',   // 96px
    '5xl': '8rem',   // 128px
  },
  
  // 🔘 Bordas
  radii: {
    none: '0',
    sm: '0.125rem',  // 2px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px
    '2xl': '1rem',   // 16px
    full: '9999px',
  },
  
  // 🎯 Botões - Tamanho mínimo 44x44px conforme spec
  buttons: {
    sizes: {
      sm: {
        height: '2.5rem',    // 40px
        padding: '0.5rem 1rem',
        fontSize: '0.875rem',
      },
      md: {
        height: '2.75rem',   // 44px - Mínimo conforme spec
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
      },
      lg: {
        height: '3rem',      // 48px
        padding: '1rem 2rem',
        fontSize: '1.125rem',
      },
    },
  },
  
  // 🌟 Sombras
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  
  // 🎭 Transições
  transitions: {
    fast: '0.15s ease-in-out',
    normal: '0.3s ease-in-out',
    slow: '0.5s ease-in-out',
  },
  
  // 📐 Z-index
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
    toast: 1070,
  },
}; 