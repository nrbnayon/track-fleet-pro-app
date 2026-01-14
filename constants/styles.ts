/**
 * Utility functions and constants for styling
 * This file provides easy access to theme colors and font utilities
 */

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

/**
 * Hook to get the current theme colors based on color scheme
 */
export function useThemeColors() {
  const colorScheme = useColorScheme();
  return Colors[colorScheme ?? 'light'];
}

/**
 * Tailwind class utilities for common patterns
 */
export const tw = {
  // Text colors
  textPrimary: 'text-primary',
  textSecondary: 'text-secondary',
  textMuted: 'text-muted-foreground',
  textForeground: 'text-foreground',
  textError: 'text-error',
  
  // Background colors
  bgPrimary: 'bg-primary',
  bgSecondary: 'bg-secondary',
  bgMuted: 'bg-muted',
  bgBackground: 'bg-background',
  bgCard: 'bg-card',
  bgError: 'bg-error',
  
  // Border colors
  borderColor: 'border-border',
  
  // Font families
  fontRegular: 'font-sans',
  fontMedium: 'font-medium',
  fontSemibold: 'font-semibold',
  fontBold: 'font-bold',
  
  // Common combinations
  card: 'bg-card border border-border rounded-lg p-4',
  button: 'bg-primary text-primary-foreground rounded-lg px-4 py-2',
  input: 'bg-input border border-border rounded-md px-3 py-2',
};

/**
 * Color palette for direct use in StyleSheet
 */
export const colorPalette = {
  light: {
    primary: '#1D92ED',
    secondary: '#414141',
    background: '#ffffff',
    foreground: '#111111',
    muted: '#f5f7fa',
    mutedForeground: '#6b7280',
    border: '#E7E7E7',
    error: '#ef4444',
    card: '#ffffff',
  },
  dark: {
    primary: '#1D92ED',
    secondary: '#414141',
    background: '#0a0e14',
    foreground: '#f3f4f6',
    muted: '#1f2937',
    mutedForeground: '#9ca3af',
    border: '#E7E7E7',
    error: '#ef4444',
    card: '#151a21',
  },
};
