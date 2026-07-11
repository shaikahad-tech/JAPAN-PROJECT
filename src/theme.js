import { alpha, createTheme } from '@mui/material/styles';

const ink = '#13151B';
const accent = '#1B6FE8';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: accent, dark: '#1559B3', light: '#5A9AF5', contrastText: '#FFFFFF' },
    secondary: { main: '#10B981', dark: '#059669', light: '#34D399' },
    background: { default: '#FAFBFE', paper: '#FFFFFF' },
    text: { primary: ink, secondary: 'rgba(3, 14, 49, 0.54)' },
    divider: 'rgba(12, 41, 126, 0.071)',
    success: { main: '#10B981' },
    warning: { main: '#F59E0B' },
    error: { main: '#F43F5E' }
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Helvetica", Arial, sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.08 },
    h2: { fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15 },
    h3: { fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.25 },
    body1: { fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.5 },
    body2: { fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.5 },
    button: { fontWeight: 600, letterSpacing: '-0.02em', textTransform: 'none' },
    overline: { fontWeight: 600, letterSpacing: '0.06em', fontSize: '0.72rem' },
    caption: { fontWeight: 500, letterSpacing: '-0.015em' }
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 28,
          minHeight: 44,
          paddingInline: 20,
          transition: 'all 0.2s ease'
        },
        containedPrimary: {
          background: ink,
          color: '#FFFFFF',
          boxShadow: 'none',
          '&:hover': {
            background: '#2D313F',
            boxShadow: 'none'
          }
        },
        containedSecondary: {
          background: accent,
          color: '#FFFFFF',
          boxShadow: 'none',
          '&:hover': {
            background: '#1559B3',
            boxShadow: 'none'
          }
        },
        outlined: {
          borderColor: 'rgba(12, 41, 126, 0.14)',
          '&:hover': {
            backgroundColor: 'rgba(12, 41, 126, 0.04)',
            borderColor: 'rgba(12, 41, 126, 0.24)'
          }
        },
        text: {
          '&:hover': {
            backgroundColor: 'rgba(12, 41, 126, 0.04)'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid rgba(12, 41, 126, 0.071)',
          boxShadow: '0 3px 8px rgba(12, 41, 126, 0.06), 0 0 1px rgba(12, 41, 126, 0.03)',
          borderRadius: 24
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        },
        outlined: {
          border: '1px solid rgba(12, 41, 126, 0.071)',
          boxShadow: 'none'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 20,
          letterSpacing: '-0.02em'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          backgroundColor: '#FFFFFF',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(12, 41, 126, 0.14)'
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(12, 41, 126, 0.3)'
          }
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          letterSpacing: '-0.02em',
          fontWeight: 500
        }
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          height: 6
        }
      }
    }
  }
});

export default theme;
