/**
 * These are configuration settings for the dev environment.
 *
 * Do not include API secrets in this file or anywhere in your JS.
 *
 * https://reactnative.dev/docs/security#storing-sensitive-info
 */
export default {
  SUPABASE_URL: "https://mcahaqdlrqxafkgirqbu.supabase.co",
  SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  APPLE_SERVICE_ID: "com.ngocdevv.vocabai.service",
  APPLE_REDIRECT_URI: "https://mcahaqdlrqxafkgirqbu.supabase.co/auth/v1/callback",
  GOOGLE_WEB_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_AUTH_WEB_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_AUTH_IOS_CLIENT_ID,
}