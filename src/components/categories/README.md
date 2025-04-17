
# Category Section Components

## Overview

The Category Section is a dynamic, interactive component that showcases different course categories for Lilly-Angel Training. It provides an engaging way to explore various course offerings through animated tabs, content display, and navigation indicators.

## Components

### 1. `CategorySection.tsx`
The main container component that orchestrates the entire category display.

- **Responsibilities**:
  - Manages the active category state
  - Renders CategoryTabs, CategoryContent, and CategoryIndicators
  - Adds icons to categories dynamically
  - Handles category change animations

### 2. `CategoryTabs.tsx`
Renders interactive, animated category selection tabs.

- **Features**:
  - Displays tabs for each category with icons
  - Supports active/inactive state styling
  - Includes hover and click animations
  - Allows switching between categories

### 3. `CategoryContent.tsx`
Displays detailed information for the selected category.

- **Features**:
  - Shows category-specific:
    - Description
    - Name
    - Tagline
    - Call-to-action button
  - Animated image display
  - Smooth transitions between categories

### 4. `CategoryIndicators.tsx`
Provides dot navigation for quick category switching.

- **Features**:
  - Dot indicators representing each category
  - Active category highlighted with a wider dot
  - Click-to-switch functionality
  - Subtle animations

### 5. `types.ts`
Defines the structure for category data.

- **Interfaces**:
  - `Category`: Defines the shape of category data
  - `categories`: Array of predefined course categories

## Data Flow

1. `CategorySection` manages the active category state
2. `CategoryTabs` allows changing the active category
3. `CategoryContent` displays details for the active category
4. `CategoryIndicators` provide alternative navigation

## Key Technologies

- React
- TypeScript
- Framer Motion (for animations)
- Tailwind CSS (for styling)
- Lucide React (for icons)

## Customization

To add a new category:
1. Update the `categories` array in `types.ts`
2. Add a corresponding icon in the icon mapping within `CategorySection`

## Performance Considerations

- Uses `React.memo` and `useCallback` for optimized rendering
- Implements lazy loading for images
- Minimizes re-renders through careful state management

