/**
 * Social Authentication Button Components
 *
 * These components provide platform-specific implementations for social authentication:
 * - Apple Sign-In: iOS (expo-apple-authentication), Android (browser OAuth), Web (browser OAuth)
 * - Google Sign-In: iOS/Android (@react-native-google-signin/google-signin), Web (@react-oauth/google)
 */

export { default as AppleSignInButton } from "./AppleSignInButton"
export { default as GoogleSignInButton } from "./GoogleSignInButton"
