# TrackFleet Pro App - Styling Guide

This document explains how to use the styling system in the TrackFleet Pro mobile app.

## 🎨 Color System

The app uses a comprehensive color system that matches the web application. All colors are defined in:
- `constants/theme.ts` - TypeScript color constants
- `tailwind.config.js` - Tailwind CSS configuration
- `global.css` - CSS variables (for reference)

### Primary Colors

```tsx
// Using Tailwind classes
<Text className="text-primary">Primary Blue (#1D92ED)</Text>
<View className="bg-primary">Primary Background</View>

// Using theme constants
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const colorScheme = useColorScheme();
const colors = Colors[colorScheme ?? 'light'];

<Text style={{ color: colors.primary }}>Primary Text</Text>
```

### Available Colors

| Color | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `primary` | #1D92ED | #1D92ED | Primary brand color |
| `secondary` | #414141 | #414141 | Secondary actions |
| `background` | #ffffff | #0a0e14 | App background |
| `foreground` | #111111 | #f3f4f6 | Primary text |
| `muted` | #f5f7fa | #1f2937 | Muted backgrounds |
| `muted-foreground` | #6b7280 | #9ca3af | Secondary text |
| `border` | #E7E7E7 | #E7E7E7 | Borders |
| `error` | #ef4444 | #ef4444 | Error states |
| `card` | #ffffff | #151a21 | Card backgrounds |

### Using Colors in Tailwind

```tsx
// Text colors
<Text className="text-primary">Primary</Text>
<Text className="text-secondary">Secondary</Text>
<Text className="text-muted-foreground">Muted</Text>
<Text className="text-error">Error</Text>

// Background colors
<View className="bg-primary">Primary BG</View>
<View className="bg-secondary">Secondary BG</View>
<View className="bg-muted">Muted BG</View>
<View className="bg-card">Card BG</View>

// Border colors
<View className="border border-border">Bordered</View>
```

## 🔤 Typography (Inter Font)

The app uses the **Inter** font family, loaded via `@expo-google-fonts/inter`.

### Font Weights

| Weight | Tailwind Class | Font File |
|--------|---------------|-----------|
| Regular (400) | `font-sans` | Inter_400Regular |
| Medium (500) | `font-medium` | Inter_500Medium |
| SemiBold (600) | `font-semibold` | Inter_600SemiBold |
| Bold (700) | `font-bold` | Inter_700Bold |

### Usage Examples

```tsx
// Using Tailwind classes
<Text className="font-sans text-base">Regular text</Text>
<Text className="font-medium text-lg">Medium text</Text>
<Text className="font-semibold text-xl">SemiBold text</Text>
<Text className="font-bold text-2xl">Bold text</Text>

// Combining font and color
<Text className="text-primary text-2xl font-bold">
  Primary Bold Heading
</Text>
```

### Text Sizes

```tsx
<Text className="text-xs">Extra Small</Text>
<Text className="text-sm">Small</Text>
<Text className="text-base">Base</Text>
<Text className="text-lg">Large</Text>
<Text className="text-xl">Extra Large</Text>
<Text className="text-2xl">2X Large</Text>
<Text className="text-3xl">3X Large</Text>
```

## 📐 Spacing & Layout

### Padding & Margin

```tsx
<View className="p-4">Padding all sides</View>
<View className="px-4 py-2">Horizontal & Vertical</View>
<View className="m-4">Margin all sides</View>
<View className="mt-2 mb-4">Top & Bottom margin</View>
```

### Flexbox

```tsx
<View className="flex flex-row items-center justify-between">
  <Text>Left</Text>
  <Text>Right</Text>
</View>

<View className="flex flex-col gap-4">
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</View>
```

## 🎯 Border Radius

```tsx
<View className="rounded-sm">Small radius (6px)</View>
<View className="rounded-md">Medium radius (8px)</View>
<View className="rounded-lg">Large radius (10px)</View>
<View className="rounded-full">Fully rounded</View>
```

## 🛠️ Utility Helpers

Import pre-defined utilities from `constants/styles.ts`:

```tsx
import { tw, useThemeColors, colorPalette } from '@/constants/styles';

// Use Tailwind class strings
<Text className={tw.textPrimary}>Primary Text</Text>
<View className={tw.card}>Card Component</View>

// Get current theme colors
const colors = useThemeColors();
<Text style={{ color: colors.primary }}>Dynamic Color</Text>

// Use color palette directly
<View style={{ backgroundColor: colorPalette.light.primary }}>
  Static Color
</View>
```

## 📦 Common Patterns

### Card Component

```tsx
<View className="bg-card border border-border rounded-lg p-4 shadow-sm">
  <Text className="text-foreground font-semibold text-lg mb-2">
    Card Title
  </Text>
  <Text className="text-muted-foreground">
    Card description text
  </Text>
</View>
```

### Button

```tsx
<Pressable className="bg-primary rounded-lg px-6 py-3">
  <Text className="text-primary-foreground font-semibold text-center">
    Press Me
  </Text>
</Pressable>
```

### Input Field

```tsx
<TextInput
  className="bg-input border border-border rounded-md px-3 py-2 text-foreground"
  placeholder="Enter text..."
  placeholderTextColor="#6b7280"
/>
```

## 🌓 Dark Mode Support

The app automatically switches between light and dark themes based on system preferences. All colors are defined for both modes in `constants/theme.ts`.

To use theme-aware colors in StyleSheet:

```tsx
import { useThemeColors } from '@/constants/styles';

function MyComponent() {
  const colors = useThemeColors();
  
  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.foreground }}>
        This text adapts to theme
      </Text>
    </View>
  );
}
```

## 🔄 Syncing with Web

The color system is synchronized with the web application (`track-fleet-pro-web`). When updating colors:

1. Update `constants/theme.ts`
2. Update `tailwind.config.js`
3. Optionally update `global.css` CSS variables (for reference)

## 📝 Best Practices

1. **Prefer Tailwind classes** for styling when possible
2. **Use theme colors** instead of hardcoded hex values
3. **Use Inter font weights** consistently across the app
4. **Test in both light and dark modes**
5. **Use semantic color names** (primary, muted) instead of color values

## 🚀 Quick Start Example

```tsx
import { View, Text, Pressable } from 'react-native';
import { useThemeColors } from '@/constants/styles';

export default function ExampleScreen() {
  const colors = useThemeColors();
  
  return (
    <View className="flex-1 bg-background p-4">
      {/* Header */}
      <Text className="text-foreground text-3xl font-bold mb-4">
        Welcome to TrackFleet Pro
      </Text>
      
      {/* Card */}
      <View className="bg-card border border-border rounded-lg p-4 mb-4">
        <Text className="text-primary text-xl font-semibold mb-2">
          Fleet Overview
        </Text>
        <Text className="text-muted-foreground font-sans">
          Manage your fleet efficiently
        </Text>
      </View>
      
      {/* Button */}
      <Pressable className="bg-primary rounded-lg px-6 py-3">
        <Text className="text-primary-foreground font-semibold text-center">
          Get Started
        </Text>
      </Pressable>
    </View>
  );
}
```

---

For more information, see:
- `constants/theme.ts` - Theme configuration
- `constants/styles.ts` - Style utilities
- `tailwind.config.js` - Tailwind configuration
