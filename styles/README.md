# Mokhtabary Dashboard Theme System

This document explains how to use the theme system in the Mokhtabary Dashboard project.

## Color Palette

The project uses a consistent color palette with primary (red) and dark (grayscale) color schemes:

### Primary Colors (Red)
- primary-50: #fef2f2
- primary-100: #fadcdc
- primary-200: #f8b9b9
- primary-300: #ed8e7b
- primary-400: #e65f54
- primary-500: #dc2626
- primary-600: #ba2225
- primary-700: #911a14
- primary-800: #7d1d17
- primary-900: #5e1011

### Dark/Neutral Colors
- dark-50: #f6f6f6  
- dark-100: #e0e0e0
- dark-200: #b6b6b6
- dark-300: #9e9e9e
- dark-400: #686868
- dark-500: #373737
- dark-600: #1d1d1d
- dark-700: #141414
- dark-800: #0a0a0a
- dark-900: #070707

## Using the Theme in Components

### Direct Usage in Tailwind Classes

You can use the theme colors directly in your Tailwind classes:

```tsx
<div className="bg-[#dc2626] text-white">Primary Button</div>
```

### Using the Theme Utility

Import the theme utilities:

```tsx
import { tw, theme, getThemeValue } from '../../styles/theme';
```

#### Using pre-defined Tailwind classes:

```tsx
<div className={tw.bg.primary[500]}>Red background</div>
<div className={tw.text.primary}>Red text</div>
```

#### Using theme object values:

```tsx
<div style={{ backgroundColor: theme.colors.primary[500] }}>
  Red background
</div>
```

#### Using dynamic theme values:

```tsx
<div style={{ backgroundColor: getThemeValue('colors.primary.500') }}>
  Red background
</div>
```

## UI Components

The project includes several UI components that already use the theme:

- `Button`: For consistent button styling
- `Card`: For content containers
- `Header`: Main navigation header
- `Sidebar`: Dashboard navigation sidebar

## Best Practices

1. Always use the theme system for colors instead of hardcoding values
2. For components that will be used across the application, update them to use theme values
3. When creating new components, reference existing ones for consistent styling
4. Use the appropriate color for the right context (e.g., primary-500 for primary actions)
