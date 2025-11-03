import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { Session, User } from "@supabase/supabase-js"

import { auth } from "@/services/supabase"

export type AuthContextType = {
  isAuthenticated: boolean
  user: User | null
  session: Session | null
  loading: boolean
  signInWithEmail: (email: string, password: string) => Promise<{ error?: any }>
  signUpWithEmail: (email: string, password: string) => Promise<{ error?: any }>
  signInWithGoogle: () => Promise<{ error?: any }>
  signInWithApple: () => Promise<{ error?: any }>
  logout: () => Promise<void>
  validationError: string
}

export const AuthContext = createContext<AuthContextType | null>(null)

export interface AuthProviderProps {}

export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    auth.getSession().then(({ data }) => {
      setSession(data.session)
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    const { error } = await auth.signInWithPassword(email, password)
    return { error }
  }, [])

  const signUpWithEmail = useCallback(async (email: string, password: string) => {
    const { error } = await auth.signUp(email, password)
    return { error }
  }, [])

  const signInWithGoogle = useCallback(async () => {
    const { error } = await auth.signInWithGoogle()
    return { error }
  }, [])

  const signInWithApple = useCallback(async () => {
    const { error } = await auth.signInWithApple()
    return { error }
  }, [])

  const logout = useCallback(async () => {
    await auth.signOut()
  }, [])

  const validationError = useMemo(() => {
    return ""
  }, [])

  const value = {
    isAuthenticated: !!user,
    user,
    session,
    loading,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signInWithApple,
    logout,
    validationError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}
