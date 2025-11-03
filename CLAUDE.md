# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **VocabAI**, a React Native mobile application built with **Ignite 11.3.2** boilerplate and **Expo SDK 54**. The app uses the New Architecture (Fabric) with Hermes JavaScript engine and supports iOS, Android, and web platforms.

**Package Manager:** bun (not npm/yarn)

## Development Commands

### Running the App

```bash
# Start development server
bun run start

# Run on specific platform
bun run ios          # iOS simulator/device
bun run android      # Android emulator/device
bun run web          # Web browser

# Run specific EAS builds (local)
bun run build:ios:sim         # iOS Simulator build
bun run build:ios:device      # iOS Device build
bun run build:ios:preview     # iOS Preview build
bun run build:ios:prod        # iOS Production build
bun run build:android:sim     # Android Simulator build
bun run build:android:device  # Android Device build
bun run build:android:preview # Android Preview build
bun run build:android:prod    # Android Production build

# Setup ADB reverse for Android development
bun run adb
```

### Code Quality

```bash
# Type check
bun run compile

# Lint and auto-fix
bun run lint

# Lint check only (no fixes)
bun run lint:check

# Check dependency structure
bun run depcruise

# Generate dependency graph visualization
bun run depcruise:graph
```

### Testing

```bash
# Run all tests
bun run test

# Run tests in watch mode
bun run test:watch

# Run E2E tests with Maestro
bun run test:maestro
```

### Other

```bash
# Align dependencies with Expo versions
bun run align-deps

# Prebuild clean
bun run prebuild:clean

# Bundle for web
bun run bundle:web
bun run serve:web
```

## High-Level Architecture

### Directory Structure

The codebase follows the **Ignite boilerplate structure**:

- **`app/`** - Application source code (organized by feature/layer)
  - **`components/`** - Reusable UI components (Button, Text, Icon, Card, etc.)
  - **`config/`** - Configuration files (dev/prod/base configs)
  - **`context/`** - React Context providers (AuthContext, EpisodeContext)
  - **`devtools/`** - Development tools setup (Reactotron)
  - **`i18n/`** - Internationalization (i18next) with multiple language files
  - **`navigators/`** - Navigation setup and utilities (AppNavigator, DemoNavigator)
  - **`screens/`** - Screen components (Login, Welcome, Demo screens)
  - **`services/`** - API services and external integrations (Api class with apisauce)
  - **`theme/`** - Design system (colors, typography, spacing, theme context)
  - **`utils/`** - Helper utilities (storage, date formatting, gesture handlers)

- **`assets/`** - Static assets (images, icons)

### Navigation Architecture

The app uses **React Navigation v7** with a **stack-based structure**:

1. **Authentication Flow** (unauthenticated users)
   - `LoginScreen` - User authentication

2. **Main Flow** (authenticated users)
   - `WelcomeScreen` - Landing screen after login
   - `DemoNavigator` - Tab-based navigation with multiple demo screens

Navigation state persistence is handled via the `navigationUtilities.ts` file and stored using MMKV storage.

### Context Providers

The app uses React Context for state management:

- **`AuthContext`** - Manages user authentication state
- **`EpisodeContext`** - Manages podcast episode data
- **`ThemeProvider`** - Manages theme and styling (dark/light mode)

### API Layer

- **Service:** `app/services/api/index.ts`
- **Client:** Apisauce (HTTP client wrapper)
- **Error Handling:** `apiProblem.ts` for API error transformation
- **Types:** `types.ts` for API response types

The API is configured via environment-specific configs:
- `config.base.ts` - Base configuration
- `config.dev.ts` - Development overrides
- `config.prod.ts` - Production overrides

### Storage

**MMKV** is used for local storage (via `react-native-mmkv`). Storage utilities are available in `app/utils/storage/index.ts`.

### Internationalization

**i18next** is used for internationalization with support for:
- English (en.ts)
- Spanish (es.ts)
- Arabic (ar.ts)
- French (fr.ts)
- Korean (ko.ts)
- Japanese (ja.ts)
- Hindi (hi.ts)

### Testing Architecture

- **Unit/Integration Tests:** Jest with `@testing-library/react-native`
- **E2E Tests:** Maestro (YAML flows in `.maestro/flows/`)
- **Test Setup:** `test/setup.ts`

## Key Configuration Files

- **`app.json`** - Expo app configuration
- **`app.config.ts`** - Dynamic Expo config (privacy manifests, plugins)
- **`eas.json`** - EAS Build configuration
- **`package.json`** - Dependencies and npm scripts
- **`tsconfig.json`** - TypeScript configuration
- **`.eslintrc.js`** - ESLint rules (TypeScript, React, React Native, Prettier)
- **`jest.config.js`** - Jest configuration
- **`metro.config.js`** - Metro bundler configuration
- **`.dependency-cruiser.js`** - Dependency validation rules

## Code Style & Conventions

### ESLint Rules

The project enforces strict import ordering and component usage:

- **Custom Components Required:** Use custom wrappers instead of raw React Native components:
  - Use `Text` from `@/components` instead of `Text` from `react-native`
  - Use `Button` from `@/components` instead of `Button` from `react-native`
  - Use `SafeAreaView` from `react-native-safe-area-context` instead of `react-native`

- **Import Order:** Alphabetized groups:
  1. Built-in modules (builtin)
  2. External packages (external)
  3. Internal packages (@/**)
  4. Parent/sibling imports

### Platform-Specific Code

Metro bundler is configured to support platform-specific extensions:
- `.ios.ts/.tsx`
- `.android.ts/.tsx`
- `.web.ts/.tsx`
- `.native.ts/.tsx`

See `app/utils/gestureHandler.ts` and `.native.ts` for examples.

### Theme System

The app uses a comprehensive theme system in `app/theme/`:
- **Colors:** `colors.ts` (light) and `colorsDark.ts` (dark)
- **Typography:** `typography.ts` with custom fonts (Space Grotesk)
- **Spacing:** `spacing.ts` with consistent spacing values
- **Theme Provider:** `context.tsx` for theme state management

## Development Tools

### Reactotron

Debugging is enabled via Reactotron in development mode (configured in `app/devtools/`):
- Supports MMKV storage debugging
- Network request logging
- Console logging

### Dependency Cruiser

Dependency structure is enforced with strict rules:
- No circular dependencies (warning)
- No orphan modules (warning)
- No deprecated packages (warning)
- No dev dependencies in production code (error)
- No spec file dependencies (error)

## Environment Configuration

The configuration system uses environment-based config:
- Base config (`config.base.ts`) merged with environment-specific overrides
- **DEV:** Uses `config.dev.ts`
- **PROD:** Uses `config.prod.ts`

This pattern is applied throughout the app for API URLs, feature flags, and other environment variables.

## Key Build Notes

- **New Architecture:** Enabled (`newArchEnabled: true`)
- **Hermes Engine:** Used for JavaScript execution
- **Edge-to-Edge:** Enabled for Android (full-screen layout)
- **TypeScript:** Strict mode enabled
- **Bundle Analysis:** Use dependency-cruiser graph generation for visualization

## Next Steps for New Features

When adding new features:

1. Follow the existing directory structure under `app/`
2. Use TypeScript for all new code
3. Add tests in appropriate `.test.ts` files
4. Update ESLint rules if needed (`.eslintrc.js`)
5. Add internationalization strings if UI text is added
6. Ensure dependency-cruiser validation passes
7. Follow the import ordering rules
8. Use the theme system for consistent styling
9. Add Maestro E2E tests if user flows are affected
