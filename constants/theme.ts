/**
 * Theme configuration for TrackFleet Pro App
 * Colors and fonts are synchronized with the web application
 */

import { Platform } from 'react-native';

// Primary brand color
const primaryColor = '#1D92ED';
const secondaryColor = '#414141';

export const Colors = {
  light: {
    // Base colors
    background: '#ffffff',
    foreground: '#111111',
    
    // Primary colors
    primary: primaryColor,
    primaryForeground: '#ffffff',
    
    // Secondary colors
    secondary: secondaryColor,
    secondaryForeground: '#ffffff',
    
    // Muted colors
    muted: '#f5f7fa',
    mutedForeground: '#6b7280',
    
    // Accent colors
    accent: primaryColor,
    accentForeground: '#ffffff',
    
    // Destructive/Error colors
    destructive: '#ef4444',
    error: '#ef4444',
    errorForeground: '#ffffff',
    
    // Border and input colors
    border: '#E7E7E7',
    input: '#e8e8eb',
    ring: '#93c5fd',
    
    // Card colors
    card: '#ffffff',
    cardForeground: '#111111',
    
    // Popover colors
    popover: '#ffffff',
    popoverForeground: '#111111',
    
    // Chart colors
    chart1: primaryColor,
    chart2: '#60a5fa',
    chart3: '#93c5fd',
    chart4: '#bfdbfe',
    chart5: '#dbeafe',
    
    // Legacy tab colors (for compatibility)
    text: '#111111',
    tint: primaryColor,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: primaryColor,
  },
  dark: {
    // Base colors
    background: '#0a0e14',
    foreground: '#f3f4f6',
    
    // Primary colors
    primary: primaryColor,
    primaryForeground: '#ffffff',
    
    // Secondary colors
    secondary: secondaryColor,
    secondaryForeground: '#ffffff',
    
    // Muted colors
    muted: '#1f2937',
    mutedForeground: '#9ca3af',
    
    // Accent colors
    accent: primaryColor,
    accentForeground: '#ffffff',
    
    // Destructive/Error colors
    destructive: '#ef4444',
    error: '#ef4444',
    errorForeground: '#ffffff',
    
    // Border and input colors
    border: '#E7E7E7',
    input: '#1f2937',
    ring: '#93c5fd',
    
    // Card colors
    card: '#151a21',
    cardForeground: '#f3f4f6',
    
    // Popover colors
    popover: '#151a21',
    popoverForeground: '#f3f4f6',
    
    // Chart colors
    chart1: primaryColor,
    chart2: '#60a5fa',
    chart3: '#93c5fd',
    chart4: '#bfdbfe',
    chart5: '#dbeafe',
    
    // Legacy tab colors (for compatibility)
    text: '#f3f4f6',
    tint: primaryColor,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: primaryColor,
  },
};

// Font configuration
export const Fonts = {
  // Primary font family (Inter)
  primary: Platform.select({
    ios: 'Inter',
    android: 'Inter',
    default: 'Inter',
  }),
  
  // System fonts as fallback
  system: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'system-ui',
  }),
  
  // Monospace font
  mono: Platform.select({
    ios: 'Menlo',
    android: 'monospace',
    default: 'monospace',
  }),
};

// Font weights
export const FontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

// Spacing scale
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border radius
export const BorderRadius = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 10,
  xl: 16,
  full: 9999,
};
