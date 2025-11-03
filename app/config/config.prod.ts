/**
 * These are configuration settings for the production environment.
 *
 * Do not include API secrets in this file or anywhere in your JS.
 *
 * https://reactnative.dev/docs/security#storing-sensitive-info
 */
export default {
  API_URL: "https://api.rss2json.com/v1/",
  SUPABASE_URL: "https://mcahaqdlrqxafkgirqbu.supabase.co",
  SUPABASE_ANON_KEY:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jYWhhcWRscnF4YWZrZ2lycWJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5ODUxMTcsImV4cCI6MjA3NzU2MTExN30.5p5RFQD5SJP6NaHs77bBz4mvylMiJNW4ONT3Hn-xF8U",  // Apple Sign-In configuration (configure these in Apple Developer Console)
  APPLE_SERVICE_ID: "com.ngocdevv.vocabai.service",
  APPLE_REDIRECT_URI: "https://mcahaqdlrqxafkgirqbu.supabase.co/auth/v1/callback",
  GOOGLE_WEB_CLIENT_ID: "446319166457-3i5kbblqj4rqv1l31467an99rk1bl2sr.apps.googleusercontent.com", // Add your Google Web Client ID here (for web platform)
  GOOGLE_IOS_CLIENT_ID: "446319166457-s205n0106lvlgb7rmi58mu7vapvn7sdk.apps.googleusercontent.com", // Add your Google iOS Client ID here (for iOS platform)
}
