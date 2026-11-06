/**
 * SegmentAI Pro - Expert UX Design System
 * Palette: Premium Black Charcoal Gray & Soothing Soft Light Gray
 * Typography: Lato (All Weights)
 */

export const colors = {
  // Charcoal Gray Palette (Primary Dark Mode)
  charcoal: {
    950: '#0E0F12', // Deepest Charcoal Obsidian
    900: '#131418', // Primary Canvas Dark
    850: '#181A20', // Surface Sidebar & Header
    800: '#20222A', // Elevated Panel Surface
    750: '#272A34', // Hover & Interactive Element Surface
    700: '#323643', // Subtle Border Outline
    600: '#434858', // Secondary Border & Hairlines
    500: '#5F667A', // Tertiary Text & Inactive Elements
    400: '#848CA2', // Secondary Text
    300: '#AAB2C6', // Subtle Foreground
    200: '#CAD1DE', // High Contrast Label
    100: '#E9ECF3', // Light Foreground
  },

  // Soft Light Gray Palette (Glare-Free, Smooth Light Mode)
  softgray: {
    50: '#FAFBFC',  // Bright Accent Surface
    100: '#F4F5F8', // Card & Panel Light Surface
    200: '#ECEEF2', // Primary Base Canvas Light
    300: '#E0E3EA', // Subtle Divider & Border Light
    400: '#CBD0DB', // Active Input Border
    500: '#9CA4B3', // Muted Icons & Secondary Metadata
    600: '#6D7585', // Secondary Body Text Light
    700: '#4A5160', // Body Text Light
    800: '#2B313D', // Primary High-Contrast Text
    900: '#171B23', // Headline Charcoal Deep
  },

  // Accent & Semantic Palettes
  primary: {
    50: '#EEF2FF',
    100: '#E0E7FF',
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#6366F1', // Primary Indigo
    600: '#4F46E5', // Deep Royal Indigo
    700: '#4338CA',
    800: '#3730A3',
    900: '#312E81',
  },

  emerald: {
    light: '#34D399',
    DEFAULT: '#10B981',
    dark: '#059669',
  },

  amber: {
    light: '#FBBF24',
    DEFAULT: '#F59E0B',
    dark: '#D97706',
  },

  rose: {
    light: '#FB7185',
    DEFAULT: '#F43F5E',
    dark: '#E11D48',
  },

  violet: {
    light: '#A78BFA',
    DEFAULT: '#8B5CF6',
    dark: '#7C3AED',
  },

  cyan: {
    light: '#38BDF8',
    DEFAULT: '#0EA5E9',
    dark: '#0284C7',
  },
};

export const typography = {
  fontFamily: {
    sans: '"Lato", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: '"Lato", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", monospace',
  },
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    heavy: 900,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },
};

export const shadows = {
  charcoalSm: '0 1px 3px 0 rgba(0, 0, 0, 0.35)',
  charcoalMd: '0 4px 12px -2px rgba(0, 0, 0, 0.45), 0 2px 6px -1px rgba(0, 0, 0, 0.3)',
  charcoalLg: '0 12px 28px -4px rgba(0, 0, 0, 0.55), 0 4px 10px -2px rgba(0, 0, 0, 0.4)',
  glowIndigo: '0 0 20px rgba(99, 102, 241, 0.3)',
  glowEmerald: '0 0 20px rgba(16, 185, 129, 0.25)',
  softLight: '0 2px 8px -1px rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.03)',
};

export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  smooth: '220ms cubic-bezier(0.16, 1, 0.3, 1)',
  bounce: '300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
};
