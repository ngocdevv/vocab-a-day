/**
 * Supabase client configuration
 * This file sets up the Supabase client for authentication and database access
 */
import Config from "@/config"
import { createClient, processLock, type SignInWithIdTokenCredentials } from "@supabase/supabase-js"
import { MMKV } from "react-native-mmkv"
import "react-native-url-polyfill/auto"

export const storage = new MMKV({
  id: "supabase",
  encryptionKey: "supabase",
})

const StorageAdapter = {
  getItem: (key: string) => {
    console.debug("getItem", { key })
    return storage.getString(key) ?? null
  },
  setItem: (key: string, value: string) => {
    return storage.set(key, value)
  },
  removeItem: (key: string) => {
    return storage.delete(key)
  },
}

const supabaseUrl = Config.SUPABASE_URL
const supabaseAnonKey = Config.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

/**
 * Create Supabase client with React Native storage adapter
 * The client is configured to persist sessions in AsyncStorage
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: StorageAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    lock: processLock,
  },
})

/**
 * Authentication helper functions
 */
export const auth = {
  /**
   * Sign up with email and password
   */
  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { data, error }
  },

  /**
   * Sign in with email and password
   */
  signInWithPassword: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  /**
   * Sign in with Google OAuth (browser-based)
   * This method opens a browser for OAuth flow
   * For native mobile experience, use the platform-specific button components
   */
  signInWithGoogle: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: Config.SUPABASE_REDIRECT_URL,
      },
    })
    return { data, error }
  },

  /**
   * Sign in with Apple OAuth (browser-based)
   * This method opens a browser for OAuth flow
   * For native mobile experience, use the platform-specific button components
   */
  signInWithApple: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "apple",
      options: {
        redirectTo: Config.SUPABASE_REDIRECT_URL,
      },
    })
    return { data, error }
  },

  /**
   * Sign in with ID token (for native OAuth)
   * This method is used by platform-specific OAuth implementations
   */
  signInWithIdToken: async (credentials: SignInWithIdTokenCredentials) => {
    const { data, error } = await supabase.auth.signInWithIdToken(credentials)
    return { data, error }
  },

  /**
   * Sign out
   */
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  /**
   * Get current session
   */
  getSession: async () => {
    const { data, error } = await supabase.auth.getSession()
    return { data, error }
  },

  /**
   * Get current user
   */
  getUser: async () => {
    const { data, error } = await supabase.auth.getUser()
    return { data, error }
  },

  /**
   * Listen to auth state changes
   */
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback)
  },
}

export default supabase
