export interface ConfigBaseProps {
  persistNavigation: "always" | "dev" | "prod" | "never"
  catchErrors: "always" | "dev" | "prod" | "never"
  exitRoutes: string[]
  SUPABASE_URL: string
  SUPABASE_ANON_KEY: string
  SUPABASE_REDIRECT_URL: string
  APPLE_SERVICE_ID?: string
  APPLE_REDIRECT_URI?: string
  GOOGLE_WEB_CLIENT_ID?: string
  GOOGLE_IOS_CLIENT_ID?: string
}

export type PersistNavigationConfig = ConfigBaseProps["persistNavigation"]

const BaseConfig: ConfigBaseProps = {
  // This feature is particularly useful in development mode, but
  // can be used in production as well if you prefer.
  persistNavigation: "dev",

  /**
   * Only enable if we're catching errors in the right environment
   */
  catchErrors: "always",

  /**
   * This is a list of all the route names that will exit the app if the back button
   * is pressed while in that screen. Only affects Android.
   */
  exitRoutes: ["Welcome"],

  SUPABASE_URL: "",

  SUPABASE_ANON_KEY: "",

  SUPABASE_REDIRECT_URL: "vocabai://",
}

export default BaseConfig
